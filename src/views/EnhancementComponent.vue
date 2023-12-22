<!-- * @Descripttion:  Visualization enhancement component
  * @version: 3.3.4
  * @Author: guanzhuyu
  * @Date: 2022-10-11 11:21:13
  * @LastEditors: kangzesheng
  * @LastEditTime: 2023-01-12 13:25:25 -->
<template>
  <div class="chat-container">
    <div class="chat-header">
      <img :src="partnerAvatar" alt="" class="avatar" />
      <h2>{{ partnerName }}</h2>
    </div>
    <div class="chat-messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="{
          'sent-message': message.isSent,
          'received-message': !message.isSent,
        }"
      >
        <img
          v-if="!message.isSent"
          :src="partnerAvatar"
          alt=""
          class="avatar"
        />
        <p>{{ message.body }}</p>
      </div>
      <div v-if="isTyping" class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div ref="messagesEnd"></div>
    </div>
    <form @submit.prevent="sendMessage" class="chat-form">
      <input
        type="text"
        placeholder="Type a message..."
        v-model="newMessage"
        @keydown.enter="sendMessage"
      />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    SceneEffect() {
      let jsonData = {
        lightPower: 1.0,
        isLayerTopMost: true,
        divTipMovingDelay: 200,
        focusDuration: 1,
        gis3dtileShadow: true,
        labelColorStyle: "default",
      };

      appInstance.uniCall("setSceneEffect", jsonData, (result) => {
        console.log(result);
      });
    },
    sendMessage() {
      if (this.newMessage.trim() === "") {
        return;
      }

      const message = {
        body: this.newMessage,
        isSent: true,
      };

      this.messages.push(message);
      this.scrollToBottom();
      this.newMessage = "";

      this.isTyping = true;
      clearTimeout(this.typingTimeoutId);
      this.typingTimeoutId = setTimeout(() => {
        this.isTyping = false;
      }, 1000);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.messagesEnd.scrollIntoView({ behavior: "smooth" });
      });
    },
  },
  name: "Chat",
  props: {
    partnerName: {
      type: String,
      required: true,
    },
    partnerAvatar: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      messages: [],
      newMessage: "",
      isTyping: false,
      typingTimeoutId: null,
    };
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.sent-message {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 10px;
}

.received-message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.received-message .avatar {
  margin-right: 0;
  margin-left: 10px;
}

.typing-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.typing-indicator span {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  animation: typing-indicator 1s ease-in-out infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

.chat-form {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}

input[type="text"] {
  flex: 1;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: #f0f0f0;
  margin-right: 10px;
}

button[type="submit"] {
  padding: 7px 15px;
  border-radius: 5px;
  border: none;
  background-color: #0077cc;
  color: #fff;
  cursor: pointer;
}
</style>
