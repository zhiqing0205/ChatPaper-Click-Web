<template>
    <div class="analysis">
        <el-row :gutter="10">
            <el-col :md="12" :lg="12" :xl="12" class="hidden-sm-and-down">
              <el-card>
                <embed v-if="pdf_preview_url !== ''" :src="pdf_preview_url" width="100%" height="900px" id="pdf" @load="onEmbedLoad"/>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="overflow-y: auto; height: calc(100vh - 105px);">
                <el-card>
                  <div v-if="result === ''"><el-skeleton :rows="31" animated /></div>
                  <div v-else>
                    <h2>Analysis Result</h2>
                    <vue-markdown :source="result" :breaks="true" :typographer="true" :linkify="true" style="font-size: 18px; text-align: left; padding: 25px;" id="markdown">
                    </vue-markdown>
                  </div>       
                </el-card>
            </el-col>
        </el-row>
        <beautiful-chat
            v-if="have_analysis"
            :participants="participants"
            :titleImageUrl="titleImageUrl"
            :onMessageWasSent="onMessageWasSent"
            :messageList="messageList"
            :newMessagesCount="newMessagesCount"
            :isOpen="isChatOpen"
            :close="closeChat"
            :open="openChat"
            :showEmoji="false"
            :showFile="false"
            :showEdition="false"
            :showDeletion="false"
            :showTypingIndicator="showTypingIndicator"
            :showLauncher="true"
            :showCloseButton="true"
            :colors="colors"
            :alwaysScrollToBottom="alwaysScrollToBottom"
            :disableUserListToggle="false"
            :messageStyling="messageStyling"
            @onType="handleOnType"
            @edit="editMessage" />
        <el-button type="primary" icon="el-icon-document" class="hidden-md-and-up fixd-bottom" circle @click="to_pdf"></el-button>
    </div>
</template>

<script>
import { downloadPaper, analyzePaper, chat } from '@/api';
import VueMarkdown from 'vue-markdown'

export default{
  components: {
    VueMarkdown
  },
    data(){
        return{
            pdf_preview_url:'',
            have_analysis:false,
            ws: null,
            clientId: '', // 客户端 UUID
            message: 'hello world',
            result: '',
            md5_hash: '',
            participants: [
            {
              id: 'GPT4',
              name: 'GPT4',
              imageUrl: 'https://img.ziuch.top/i/2023/12/28/j4ffw0-2.webp'
            },
          ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
          titleImageUrl: 'https://img.ziuch.top/i/2023/12/28/j4ffw0-2.webp',
          messageList: [
              { type: 'text', author: `GPT4`, data: { text: `我是一个基于GPT4的人工智能助手，专注于机器学习和深度学习领域的研究。我已阅读完该论文，我可以帮助您总结论文、回答问题以及提供此领域的相关信息。请问有什么可以帮您的吗？` } },
          ], // the list of the messages to show, can be paginated and adjusted dynamically
          newMessagesCount: 0,
          isChatOpen: false, // to determine whether the chat window should be open or closed
          showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
          colors: {
            header: {
              bg: '#4e8cff',
              text: '#ffffff'
            },
            launcher: {
              bg: '#4e8cff'
            },
            messageList: {
              bg: '#ffffff'
            },
            sentMessage: {
              bg: '#4e8cff',
              text: '#ffffff'
            },
            receivedMessage: {
              bg: '#eaeaea',
              text: '#222222'
            },
            userInput: {
              bg: '#f4f7f9',
              text: '#565867'
            }
          }, // specifies the color scheme for the component
          alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
          messageStyling: true 
        }
    },
    mounted() {
      this.connect();
    },
  methods: {
    connect() {
      // this.ws = new WebSocket(`ws://localhost:8000/ws/${this.clientId}`);
      this.ws = new WebSocket(`wss://api.chatpaper.click/ws/${this.clientId}`);
      this.ws.onmessage = (event) => {
        console.log(event.data)
        this.result += event.data
        // 如果event.data内出现结论两个字，说明分析完了
        if (event.data.indexOf('结论') !== -1 || event.data.indexOf('8.') !== -1) {
          this.have_analysis = true
        }
      };
    },
    sendMessage_ws() {
      if (this.message !== '') {
        this.ws.send(this.message);
        this.message = 'test';
      }
    },
    to_pdf() {
      // 在新窗口打开pdf
      window.open(this.pdf_preview_url, '_blank');
    },
    onEmbedLoad() {
      console.log('The embed content has loaded successfully!');

      // file_path是从static开始的路径
      let file_path = 'static' + this.pdf_preview_url.split('static')[1]
      analyzePaper(file_path, this.clientId).then((res) => {
        // 如果res内含result说明该论文之前就解析好了
        if (res && res.result) {
          this.result = res.result
          this.have_analysis = true
          return
        }

        this.$notify({
          title: '提交成功',
          message: '正在用GPT4解析论文，请稍等~',
          type: 'success'
        });
      })
    },
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'me', type: 'text', data: { text } })
        console.log('text', text)
        
      } else {
        this.$message({
          message: '请输入内容',
          type: 'warning'
        });
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
      // 去除掉第一条消息
      let messageList = this.messageList.slice(1)
        chat(messageList, this.md5_hash).then((res) => {
          console.log('res', res)
          // this.onMessageWasSent({ author: 'GPT4', type: 'text', data: { text: res.result } })
          this.messageList = [...this.messageList, { author: 'GPT4', type: 'text', data: { text: res.result } }]
        })
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  },
  created() {
    this.clientId = this.getUUID();

    // 从路径中提取pdf_url并发送给后端 ?pdf_url = xxx
    let pdf_url = this.$route.query.pdf_url;
    if (pdf_url === undefined) {
        pdf_url = '';
        this.$message.error('pdf_url参数错误');
        return;
    }

    this.$message({
      message: '等待PDF下载完成...',
      type: 'success'
    });
    downloadPaper(pdf_url).then((res) => {
        this.pdf_preview_url = res.url;
        console.log(this.pdf_preview_url);
        // md5就是文件名
        this.md5_hash = this.pdf_preview_url.split('/')[this.pdf_preview_url.split('/').length - 1].split('.')[0];
        // 调整pdf的高度
        setTimeout(() => {
            const pdf = document.getElementById('pdf');
            pdf.height = window.innerHeight - 150;
        }, 180);

        this.$message({
          message: 'PDF下载完成',
          type: 'success'
        });
        
    }).catch((err) => {
        this.$message.error(err);
    });

  },
}
</script>

<style>   
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
 
.fixd-bottom{
    position:fixed;
    right:20px;
    bottom:90px;
    animation: pulse 2s infinite;
 }
 @keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.125);
        opacity: 0.85;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
#markdown p {
  margin: 0;
  padding: 0;
  margin-bottom: 1em;
  line-height: 1.5;
  color: #333;
  word-break: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.analysis {
  text-align: left;
}
</style>