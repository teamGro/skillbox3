import { createApp } from 'vue';
import App from './App.vue';
import { messageWorld, messageVue } from './homeTask_2/messages';
import printMessage from './homeTask_2/func';

createApp(App).mount('#app');
printMessage(messageVue);
printMessage(messageWorld);
