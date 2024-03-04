// composables/useAuth.js
import { inject, ref } from 'vue';

export function useAuth() {
    const pb = inject('api');
    const currentUser = ref(null);
    const email = ref('');
    const password = ref('');
    const fullName = ref('');

    const doLogin = async () => {
        try {
            await pb.collection('users').authWithPassword(email.value, password.value);
            currentUser.value = pb.authStore.model;
            localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
            console.log('Login successful');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const doLogout = () => {
        pb.authStore.clear();
        currentUser.value = null;
        console.log('Logged out');
        localStorage.removeItem('currentUser');
    };

    const doCreateAccount = async () => {
        try {
            await pb.collection('users').create({
                username: fullName.value,
                email: email.value,
                emailVisibility: true,
                password: password.value,
                passwordConfirm: password.value,
                name: fullName.value,
            });
            await doLogin(); // Log the user in after account creation
            console.log('Account created and logged in');
        } catch (error) {
            console.error('Account creation failed:', error.message);
        }
    };

    return {
        currentUser,
        email,
        password,
        fullName,
        doLogin,
        doLogout,
        doCreateAccount
    };
}
