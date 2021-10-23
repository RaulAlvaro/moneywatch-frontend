<template>
  <div class="container-moneywatch">
    <h1 class="text-center my-5">Ingresos y Egresos</h1>
    <v-row>
      <v-col cols="2">
        <v-select
          v-model="daySelected"
          :items="days"
          label="Dia"
          item-value="id"
          item-text="name"
          dense
          solo
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="monthSelected"
          :items="months"
          label="Mes"
          item-value="id"
          item-text="name"
          dense
          solo
        ></v-select>
      </v-col>
      <!-- <v-col cols="3">
        <v-date-picker v-model="dateSelected" range></v-date-picker>
      </v-col>
      <v-col>
        <v-btn @click="clearDates">Limpiar fechas</v-btn>
      </v-col> -->
    </v-row>
    <v-row>
      {{ dateSelected }}
    </v-row>
    <v-data-table
      dense
      :headers="headers"
      :items="getItemsFormatted"
      :items-per-page="getItemsFormatted.length"
      hide-default-footer
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:[`item.monto`]="{ item }">
        <div
          class="monto-style"
          :style="[item.monto < 0 ? { color: 'red' } : { color: 'blue' }]"
        >
          {{ item.monto.toFixed(2) }}
        </div>
      </template>
      <template v-slot:[`item.tiposPago`]="{ item }">
        <span v-for="(tipoPago, key) in item.tiposPago" :key="key">
          <span
            class="card-style"
            :style="{ backgroundColor: tipoPago.color }"
            >{{ tipoPago.nombre }}</span
          >
        </span>
      </template>
      <template v-slot:[`item.categorias`]="{ item }">
        <span v-for="(categoria, key) in item.categorias" :key="key">
          <span
            class="card-style"
            :style="{ backgroundColor: categoria.color }"
            >{{ categoria.nombre }}</span
          >
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(weekday);

import days from '../constants/days';
import months from '../constants/months';
import typeAccountService from '../services/typeAccountService';

export default {
  async created() {
    const typeAcccounts = await typeAccountService.findAll();
    console.log('typeAcccounts.data', typeAcccounts.data);
    const url = process.env.VUE_APP_AIRTABLE_URL;
    const headers = {
      Authorization: `Bearer ${process.env.VUE_APP_AIRTABLE_KEY}`,
      'Content-Type': 'application/json',
    };
    const responsve = await fetch(url, { headers });
    let { records } = await responsve.json();
    this.items = records.sort((a, b) => {
      return new Date(a.fields.fecha) - new Date(b.fields.fecha);
    });
  },
  data() {
    return {
      headers: [
        {
          text: 'Código',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Descripción',
          value: 'descripcion',
          align: 'center',
          sortable: false,
        },
        { text: 'Monto', value: 'monto', align: 'right', sortable: false },
        { text: 'Fecha', value: 'fecha', align: 'center' },
        {
          text: 'Tipo Pago',
          value: 'tiposPago',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Categoría',
          value: 'categorias',
          align: 'center',
          sortable: false,
        },
      ],
      items: [],
      days: days,
      daySelected: '',
      months: months,
      monthSelected: '',
      dateSelected: [],
    };
  },
  computed: {
    getItemsFormatted() {
      let itemsFiltered = [...this.items];
      let itemsFormatted = [];

      if (Number.isInteger(this.daySelected)) {
        itemsFiltered = itemsFiltered.filter(
          (c) => this.daySelected === dayjs(c.fields.fecha).weekday()
        );
      }

      if (Number.isInteger(this.monthSelected)) {
        itemsFiltered = itemsFiltered.filter(
          (c) => this.monthSelected === dayjs(c.fields.fecha).get('month')
        );
      }

      if (this.dateSelected.length > 0) {
        const orderDates = [...this.dateSelected].sort((a, b) => {
          return new Date(a) - new Date(b);
        });

        if (orderDates.length === 1) {
          itemsFiltered = itemsFiltered.filter((c) =>
            dayjs(orderDates[0]).isSame(dayjs(c.fields.fecha))
          );
        }

        if (orderDates.length === 2) {
          itemsFiltered = itemsFiltered.filter(
            (c) =>
              (dayjs(dayjs(c.fields.fecha)).isAfter(orderDates[0]) ||
                dayjs(dayjs(c.fields.fecha)).isSame(orderDates[0])) &&
              (dayjs(dayjs(c.fields.fecha)).isBefore(orderDates[1]) ||
                dayjs(dayjs(c.fields.fecha)).isSame(orderDates[1]))
          );
        }
      }

      itemsFiltered.forEach((item) => {
        let categorias = [];
        let tiposPago = [];
        if (item.fields['nombre (from categoria)']) {
          for (
            let index = 0;
            index < item.fields['nombre (from categoria)'].length;
            index++
          ) {
            categorias.push({
              nombre: item.fields['nombre (from categoria)'][index],
              color: item.fields['color (from categoria)'][index],
            });
          }
        }
        if (item.fields['nombre (from tipo_pago)']) {
          for (
            let index = 0;
            index < item.fields['nombre (from tipo_pago)'].length;
            index++
          ) {
            tiposPago.push({
              nombre: item.fields['nombre (from tipo_pago)'][index],
              color: item.fields['color (from tipo_pago)'][index],
            });
          }
        }
        itemsFormatted.push({
          id: item.fields.codigo,
          descripcion: item.fields.descripcion,
          monto: item.fields.costo,
          fecha: dayjs(item.fields.fecha).format('DD-MM-YYYY'),
          tiposPago,
          categorias,
        });
      });
      return itemsFormatted;
    },
  },
  methods: {
    clearDates() {
      this.dateSelected = [];
    },
  },
};
</script>

<style>
.container-moneywatch {
  padding: 0 3em;
}

.monto-style {
  font-weight: bold;
}

.card-style {
  border: 1px solid transparent;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-right: 5px;
  padding: 5px;
}
</style>
