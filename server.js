import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
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