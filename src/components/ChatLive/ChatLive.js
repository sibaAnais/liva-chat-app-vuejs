import { mapGetters, mapActions } from "vuex"
import {Chat} from 'vue-chat-widget'

export default {
  name: 'chat-live',
  components: {
    Chat
  },
  props: [],
  data () {
    return {
      // messageList: [],
      initOpen: false,
      toggledOpen: false,
      // chat: {
      //   username: null,
      //   id: null,
      //   start_date: null,
      //   status: null,
      // }
    }
  },
  computed: {
    ...mapGetters({chat: "StateChat", messageList: "StateMessages"}),
  },
  mounted () {
    // this.messageList = this.Messages;
    // this.messageList = this.$store.getters['StateMessages'];
    // console.log('mounted this.messageList', this.messageList);
    // this.chat = this.Chat;
    if (this.chat.id !== null) {
      this.loadMessage();
      this.initOpen = true;
    }
  },
  watch: {
    messageList: function() {
      // const nextMessage = newList[newList.length - 1]
      // const isIncoming = (nextMessage || {}).author !== 'you'
      // if (isIncoming && this.toggledOpen) {
      //   this.handleMessageResponseSound()
      // }
    },
    chat: function(newVal) {
      console.log(this.chat , 'vs', newVal);
    }
  },
  methods: {
    ...mapActions(["ConnectUser", "SendMessage", "GetAllMessages"]),
    async loadMessage() {
      try {
        await this.GetAllMessages();
      } catch (err) {
        console.log(err);
        this.error = err.error
      }
    },
    async createChat() {
      try {
        await this.ConnectUser(this.chat.username);
      } catch (err) {
        console.log(err);
        this.error = err.error
      }
    },
    async handleMessageReceived(message) {
      try {
        await this.SendMessage(message.body);
        console.log('handleMessageReceived messageList', this.messageList);
        console.log('handleMessageReceived Messages', this.Messages);
      } catch (err) {
        console.log(err);
        this.error = err.error
      }
      // this.messageList.push(message)
    },
    // Receive message from them (handled by you with your backend)
    handleMessageResponse(message) {
       if (message.length > 0) {
          this.messageList.push({ body: message, author: 'them' })
        }
    },
    // Chat toggled open event emitted
    handleToggleOpen(open) {
      this.toggledOpen = open
      // connect/disconnect websocket or something
    },
    // Audible chat response noise, use whatever noise you want
    handleMessageResponseSound() {
      // const audio = new Audio(incomingMessageSound)
      // audio.addEventListener('loadeddata', () => {
      //   audio.play()
      // })
    },

  }
}


