<template>
  <div>
    <input
      type="text"
      placeholder="Email"
      v-model="email"
    />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <button @click="tryLogin">Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { login } from '../requests';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async tryLogin() {
      try {
        const token = await login(this.email, this.password);
        this.login(token);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions(['login']),
  },
};
</script>

<style>

</style>
