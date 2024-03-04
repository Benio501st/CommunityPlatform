<template>
    <div v-if="currentUser">
      <Navbar :isLoginMode="loginMode" @emitLogout="handleEmitLogout" />
      <ForumList />
    </div>
    <div v-else class="d-flex justify-content-center flex-wrap flex-lg-nowrap">
      <img src="../assets/bespinian-logo.svg" alt="" class="logo" />
      <div class="text-light">
        <h1>bespinian</h1>
        <h5>Cloud Native Citizens</h5>
        <h5>Citizens Forum</h5>
      </div>

      <div class="container text-light login-form">
        <h1 class="text-light">{{ loginMode ? "Login" : "Create Account" }}</h1>

        <div class="mb-3">
          <label for="userEmail" class="form-label">Email Address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            v-model.trim="email"
          />
          <div id="emailHelp" class="form-text text-light">Please, use authenticated e-mail provider</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model.trim="password"
          />
        </div>
        <div v-if="!loginMode">
          <div class="mb-3">
            <label for="fullName" class="form-label">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="fullName"
              v-model.trim="fullName"
            />
          </div>
        </div>
        <div v-if="loginMode" class="d-flex justify-content-between">
          <button type="submit" class="btn btn-light" @click="doLogin">
            Submit
          </button>
          <button type="button" class="btn btn-light" @click="toggleLoginMode">
            Create Account
          </button>
        </div>
        <div v-else class="d-flex justify-content-between">
          <button type="submit" class="btn btn-light" @click="doCreateAccount">
            Save new user
          </button>
          <button type="button" class="btn btn-danger ml-1" @click="toggleLoginMode">
            Cancel
          </button>
        </div>
      </div>
    </div>

</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import ForumList from "@/components/ForumList.vue";
import { onMounted, watch, ref } from 'vue';
import { useAuth } from "@/composables/useAuth";

const { currentUser, email, password, fullName, doLogin, doLogout, doCreateAccount } = useAuth();
const storedUser = localStorage.getItem('currentUser');
if (storedUser) {
  currentUser.value = JSON.parse(storedUser);
}
let loginMode = ref(true);

onMounted(async () => {
  // Watching the currentUser to change body background color
 watch(
  currentUser,
    (newValue) => {
      if (newValue !== null) {
        // Change body background color to white when currentUser is not null
        document.body.style.backgroundColor = "white";
      } else {
        document.body.style.backgroundColor = "#3273DC";
      }
    },
    { immediate: true }
  );
})

const toggleLoginMode = () => {
  loginMode.value = !loginMode.value;
  // Clear form fields when toggling mode
  email.value = '';
  password.value = '';
  fullName.value = '';
};

function handleEmitLogout() {
  doLogout();
  loginMode.value = true; // Reset to login mode after logout
}

 
</script>

<style>
.logo {
  width: 10em;
  height: 10em;
  margin: 0 auto;
}

.login-form {
  margin: 3em;
  padding: 2em;
  /* From https://css.glass */
  background: rgba(14, 84, 205, 0.79);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.6px);
  -webkit-backdrop-filter: blur(2.6px);
  border: 1px solid rgba(14, 84, 205, 0.49);
}

.welcome-bar {
  margin-top: 20vh;
}

</style>
