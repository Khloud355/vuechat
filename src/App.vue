<template>
  <section class="chat">
    <div class="conatiner">
      <div class="chat-content">
        <div class="login" v-if="state.username === '' || state.username === null">
          <h3>VueChat</h3>
          <form @submit.prevent="Login">
            <input
              type="text"
              class="form-control"
              placeholder="Please enter your name..."
              name
              id
              v-model="inputLogin"
            />
            <button type="submit" class="log-bt">Login</button>
          </form>
        </div>
        <div class="chat-area" v-else>
          <header>
            <div class="header-user">
              <div class="user-icon">{{getFirstLetter(state.username)}}</div>
              <h2 class="user-name">{{state.username}}</h2>
            </div>
            <div class="header-logout" @click="Logout">LogOut</div>
          </header>
          <main>
            <div
              class="message-box"
              :class="state.username ===m.username &&'current-user'"
              v-for="m in state.message"
              :key="m.id"
            >
              <div class="user-icon">{{getFirstLetter(m.username)}}</div>
              <div class="message">{{m.body}}</div>
            </div>
            <!-- <div class="message-box">
              <div class="user-icon">M</div>
              <div class="message">my name is Mohammed</div>
            </div>-->
          </main>
          <footer>
            <form @submit.prevent="sendMessage">
              <input
                type="text"
                class="form-control"
                placeholder="type a message"
                name
                id
                v-model="inputMessage"
              />
              <button type="submit" class="send-bt">Send</button>
            </form>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
body {
  background-color: pink;
  position: relative;
  .chat {
    .chat-content {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 1rem 0;
      border-radius: 1rem;
      background-color: purple;
      .login {
        background-color: #ccc;
        // top: 50%;
        // position: absolute;
        text-align: center;
        margin: 10rem 1rem;
        padding: 2rem 1rem;
        border-radius: 1rem;
        input {
          width: 100%;
          border-radius: 2rem;
          margin: 1rem 0;
          &:focus {
            box-shadow: none;
          }
          &::placeholder {
            font-size: 0.9rem;
          }
        }
        .log-bt {
          width: 100&;
          width: 100%;
          border-radius: 2rem;
          border: none;
          color: #fff;
          background-color: plum;
          font-weight: 700;
          margin-bottom: 1rem;

          &:focus {
            outline: none;
          }
        }
      }
    }
    .chat-area {
      header {
        display: flex;
        align-items: center;
        padding: 1rem;
        .header-user {
          display: flex;
          align-items: center;

          .user-icon {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background-color: #eee;
            text-align: center;
            color: rgb(117, 117, 117);
            font-weight: 700;
            // padding: 1rem 0;
            margin-right: 0.6rem;
          }
          .user-name {
            color: #fff;
            font-size: 1rem;
          }
        }
        .header-logout {
          margin-left: auto;
          color: #fff;
          cursor: pointer;
        }
      }
      main {
        background-color: #fff;
        border-radius: 1rem;
        padding: 1rem 1rem;
        height: 26rem;
        overflow-y: scroll;
        .message-box {
          display: flex;
          margin-top: 1rem;
          max-width: 20rem;
          .user-icon {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background-color: #ccc;
            margin-right: 1rem;
            text-align: center;
            font-weight: 700;
            color: rgb(117, 117, 117);
            font-size: 0.9rem;
          }
          .message {
            background-color: antiquewhite;
            padding: 0.5rem;
            border-radius: 1rem;
          }
        }
        .current-user {
          justify-content: flex-end;
          .message {
            background-color: #000 !important;
            color: #fff;
          }
          .user-icon {
            order: 1;
            margin-left: 1rem;
            margin-right: 0 !important;
            width: 2rem;
            height: 2rem;
            color: rgb(117, 117, 117);
            font-size: 0.9rem;
            text-align: center;
          }
        }
      }
      footer {
        padding: 1rem;
        form {
          display: flex;
          align-items: center;
          flex-direction: row;
          border-radius: 1rem;
          input {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;
            &:focus {
              box-shadow: none;
              border: none;
            }
          }
          .send-bt {
            border: none;
            background-color: fuchsia;
            height: calc(1.5em + 0.75rem + 2px);
            border-top-right-radius: 1rem;
            border-bottom-right-radius: 1rem;
            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
}
</style>
<script>
import { ref, reactive, onMounted } from "vue";
import db from "./db";
export default {
  setup() {
    const inputLogin = ref("");
    const inputMessage = ref("");
    const state = reactive({
      username: "",
      message: [],
    });
    const Login = () => {
      if (inputLogin.value !== "" || inputLogin.value !== null) {
        state.username = inputLogin.value;

        inputLogin.value = "";
        state.message =null
      }
      // if (state.username !== state.username) {
      //   state.message = "";
      // }
      // if (state.username === inputLogin.value) {
      //   state.message = null;
      // }
    };

     const sendMessage = () => {
      const messageRef = db.database().ref("messages");
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      const message = {
        username: state.username,
        body: inputMessage.value,
      };

      messageRef.push(message);
      inputMessage.value = "";
    };
    onMounted(() => {
      const messageRef = db.database().ref("messages");
      messageRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            body: data[key].body,
          });
        });
        
        state.message = messages;
      });
    });
    const getFirstLetter = (username) => {
      return username.charAt(0);
    };
    const Logout = () => {
      state.username = "";
      state.username === null;
      state.message =null
      
    db.database().ref("messages").remove()
    // sendMessage(()=>{
    //     return
    //   })
    };
    return {
      inputLogin,
      getFirstLetter,
      Login,
      Logout,
      state,
      sendMessage,
      inputMessage,
    };
  },
};
</script>