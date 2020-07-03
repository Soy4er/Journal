<template>
  <v-container>
    <v-row
      no-gutters
    >
      <v-btn
        color="primary"
        type="button"
        @click="clearJournal"
        >Clear Journal</v-btn
      >
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Message</th>
                <th class="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in logsSortByDate" :key="index">
                <td>{{ item.message }}</td>
                <td>{{ item.date | dateFilter }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['logsSortByDate']),
  },
  filters: {
    dateFilter(v) {
      const date = new Date(v);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  },
  methods: {
    clearJournal() {
      this.$store.commit('CLEAR_LOGS');
    },
  },
};
</script>
