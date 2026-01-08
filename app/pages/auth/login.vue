<template>
  <v-app>
    <div class="login-wrapper d-flex align-center justify-center fill-height">


      <v-card class="pa-8 rounded-lg" color="transparent" width="400" elevation="0">
        <!-- Logo -->
        <div class="text-center mb-4">
          <v-img src="/SNC-Logo.png" alt="Logo" max-width="100" class="mx-auto" contain />
        </div>

        <h2 class="text-center font-weight-bold mb-6">Welcome Back!</h2>

        <v-form v-model="valid" ref="loginForm" lazy-validation @submit.prevent="submit">
          <v-text-field v-model="user.identifier" label=" Username" :rules="[rules.required]"
            prepend-inner-icon="mdi-account-outline" bg-color="white" variant="solo-filled" rounded="xl" flat class="mb-4" hide-details="auto" dense />

          <v-text-field v-model="user.password" label="Password" :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="togglePasswordVisibility"
            :rules="[rules.required]" prepend-inner-icon="mdi-lock-outline" bg-color="white" rounded="xl" variant="solo-filled" flat class="mb-2"
            hide-details="auto" dense />

          <div class="d-flex justify-end mb-4">
            <NuxtLink class="text-caption text-blue-darken-2">
              Forgot your password?
            </NuxtLink>
          </div>

          <v-btn :loading="loading" :disabled="loading" type="submit" rounded="xl"
            class="text-capitalize rounded-lg shadow-md transform hover:-translate-y-0.5 mb-4" color="green" block
            height="45">
            Sign in
          </v-btn>
        </v-form>

        <div class="text-center text-caption">
          Don’t have an account?
          <NuxtLink class="text-blue-darken-2 font-weight-medium">Sign up</NuxtLink>
        </div>


      </v-card>


      <v-footer app height="32" class="d-flex align-center justify-center text-grey"
        style="background: transparent; position: fixed; bottom: 0; left: 0; width: 100%;">
        <small>Version {{ version }}</small>
      </v-footer>


      <v-snackbar v-model="snackbar" location="top" color="error">
        {{ text }}

        <template v-slot:actions>
          <v-btn variant="icon" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script setup>

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Log In",
});
const router = useRouter();
const { login, fetchUser } = useMyAuthStore()
const { authenticated } = storeToRefs(useMyAuthStore())
const { errorLogin } = storeToRefs(useMyAuthStore())
const { errorMessage } = storeToRefs(useMyAuthStore())


//Major: Breaking changes
//Minor: New Features, backward compatible
//Patch: Bug fixes only
const version = ref("1.13.0") //Major.Minor.Patch
const username = ref("");
const password = ref("");
const user = ref({
  identifier: "",
  password: "",
});
const valid = ref(true);
const showPassword = ref(false);
const loginForm = ref(null);
const loading = ref(false);
const error = ref('')
const snackbar = ref(false);
const text = ref("");


const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) =>
    !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address",
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submit = async () => {
  const { valid, errors } = await loginForm.value?.validate()
  loading.value = true
  error.value = ''

  if (valid) {

    //console.log("Logging in...")
    try {
      await login(user.value)
      if (authenticated.value == true) {
        fetchUser();
        //navigateTo(redirectByRole(auth.role))
        loading.value = false
        router.push('/')
      }

      if (errorLogin.value == true) {
        loading.value = false;
        snackbar.value = true;
        text.value = errorMessage.value;
        //console.log("Error login: ", errorMessage.value)
      }
    } catch (err) {
      console.log(err)
      loading.value = false;
    }

  } else {
    loading.value = false;
  }


}

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}

.login-wrapper {
  /* background: linear-gradient(135deg, #3b82f6, #8b5cf6);  */
  /* background: linear-gradient(135deg,
      #22c55e,
      #34b864); */
  /* Light Green to Dark Green */
/* background: linear-gradient(180deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%); */
background: #E0E0E0;
}
</style>
