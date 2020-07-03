<template>
  <v-container>
    <v-row
      class="mb-6 text-center"
      justify="center"
      align="center"
      no-gutters
      style="height: 100vh"
    >
      <v-col cols="4">
        <h1 class="text-h4">Authorization</h1>
        <v-form ref="form" v-model="valid" @submit.prevent="submit" :disabled="loading">
          <v-text-field
            v-model.trim="login"
            :rules="loginRules"
            label="Login"
            required
          ></v-text-field>

          <v-text-field
            v-model.trim="password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passRules"
            :type="showPass ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="showPass = !showPass"
          ></v-text-field>

          <v-alert type="error" v-if="error.status">
            {{ error.message }}
          </v-alert>

          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <v-btn
            :disabled="!valid || !formIsValid"
            color="primary"
            type="submit"
            v-else
            >Sign In</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    loading: false,
    error: { status: false },
    valid: true,
    login: '',
    loginRules: [(v) => !!v || 'Login is required'],
    showPass: false,
    password: '',
    passRules: [(v) => !!v || 'Password is required.'],
  }),
  computed: {
    formIsValid() { return !!this.login && !!this.password; },
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await this.axios.post('http://www/api/auth', {
          login: this.login,
          password: this.password,
        });
        setTimeout(() => {
          this.$store.commit('CREATE_LOG', {
            message: 'Попытка авторизации',
            date: Date.now(),
          });
          this.$router.push({ name: 'Journal' });
          this.loading = false;
        }, 2000);
      } catch (error) {
        const { status } = error.response;
        this.error = (status === 403)
          ? { status: true, message: 'Неверный логин или пароль' }
          : { status: true, message: 'Не известная ошибка' };
        this.loading = false;
      }
    },
  },
};
</script>
