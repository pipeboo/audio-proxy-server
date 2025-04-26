const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(cors({
  origin: "https://huayu-recording-web.netlify.app"  // 只允許來自Netlify網頁的請求
}));
app.use(express.json());

const WIX_FUNCTION_URL = "https://kps0980.wixsite.com/flower-for-you/_functions/saveAudio"; // 改成你的Wix HTTP Function網址

app.post('/save-audio', async (req, res) => {
  try {
    const response = await axios.post(WIX_FUNCTION_URL, req.body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    res.status(200).send({ message: "成功轉發到Wix", wixResult: response.data });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send({ error: "轉發到Wix失敗" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy Server running on port ${port}`);
});