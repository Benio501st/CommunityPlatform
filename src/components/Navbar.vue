<script setup>
import { useAuth } from "@/composables/useAuth";
const { currentUser } = useAuth();

const storedUser = localStorage.getItem("currentUser");
if (storedUser) {
  currentUser.value = JSON.parse(storedUser);
}

const emit = defineEmits(["emitLogout"]);

const logoutUser = () => {
  // Emit an event or redirect as necessary
  emit("emitLogout");
};
</script>

<template>
  <nav class="navbar fixed-top">
    <div
      class="container bg-primary navbar-styling d-flex justify-content-between"
    >
      <a class="navbar-brand" href="/">
        <img
          src="../assets/bespinian-logo.svg"
          alt="bespinian.io"
          class="img-style"
        />
      </a>

      <div class="d-flex align-items-center">
        <span class="text-white link-underline-light me-5"
          ><router-link
            :to="{ name: 'user-page', params: { id: currentUser.id } }"
            class="router-link-style" ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="user-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg> 
            <span class="text-light link-underline-light" v-if="currentUser"
          >Welcome {{ currentUser.name }}</span
        ></router-link
        ></span>
        <!-- Display the current user's name if logged in -->
        <button @click="logoutUser" class="btn btn-danger">Log Out</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav{
  width: 80vw;
  margin: auto;
}

.router-link-style{
  color: white;
  text-decoration: none;
}
.router-link-style:hover{
  color: white;
  text-decoration: underline;
}
.user-icon {
  width: 4vw;
  height: 4vh;
  color: white;
}

.img-style {
  width: 3rem;
  height: 3rem;
}
.navbar-styling {
  margin-top: 0;
  border-radius: 25px 25px 25px 25px;
  -webkit-border-radius: 25px 25px 25px 25px;
  -moz-border-radius: 25px 25px 25px 25px;
  -webkit-box-shadow: -1px 15px 51px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 15px 51px -11px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 15px 51px -11px rgba(0, 0, 0, 0.75);
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .navbar-styling {
    margin-top: 3em;
    padding: 1em 2em;
    border-radius: 25px 25px 25px 25px;
    -webkit-border-radius: 25px 25px 25px 25px;
    -moz-border-radius: 25px 25px 25px 25px;
    -webkit-box-shadow: -1px 15px 51px -11px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 15px 51px -11px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 15px 51px -11px rgba(0, 0, 0, 0.75);
  }
}
</style>
