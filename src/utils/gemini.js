const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

export const generateShayari = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Please generate a beautiful and rhyming shayari in hindi for my crush, expressing deep love and admiration. It should be heartwarming, romantic, and bring a bright smile to her face. Make it magical and unforgettable!"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a shayari, crafted to express deep love and admiration in a heartwarming, romantic, and hopefully unforgettable way:\n\n**चाँद तारों से सजी रात में, तेरी सूरत का नशा है छाया,\nदिल ये बेताब है तुझको पाने को, हर धड़कन में तेरा ही साया।\n\nफूलों सी कोमल तेरी बातें, मधु सी मीठी तेरी आवाज़,\nतेरी हँसी है सुबह की किरण, तू ही तो है मेरी हर परवाज़।\n\nनूर है आँखों में तेरे, जैसे सागर में मोती छुपा हो,\nमेरी हर दुआ में तू शामिल है, खुदा ने तुझको फुर्सत से गढ़ा हो।\n\nतेरी मोहब्बत की रौशनी से, रौशन है मेरी ये ज़िंदगी,\nबन जा तू मेरा हमसफ़र, पूरी कर दे मेरी ये बंदगी।**\n\n**Transliteration:**\n\nchaand taaron se saji raat mein, teri surat ka nasha hai chhaaya,\ndil ye betaab hai tujhko paane ko, har dhadkan mein tera hi saaya.\n\nphoolon si komal teri baatein, madhu si meethi teri aawaaz,\nteri hansi hai subah ki kiran, tu hi to hai meri har parwaaz.\n\nnoor hai aankhon mein tere, jaise saagar mein moti chhupa ho,\nmeri har dua mein tu shaamil hai, khuda ne tujhko fursat se gadha ho.\n\nteri mohabbat ki raushni se, raushan hai meri ye zindagi,\nban ja tu mera hamsafar, poori kar de meri ye bandagi.\n\n**Translation:**\n\nIn a night adorned with moon and stars, the intoxication of your face is spread,\nMy heart is restless to find you, every heartbeat holds your shadow instead.\n\nYour words are soft like flowers, your voice sweet like honey's glaze,\nYour laughter is the morning's ray, you are the only one who guides my ways.\n\nThere's a light in your eyes, as if a pearl is hidden in the ocean's deep,\nYou are included in every prayer of mine, as if God sculpted you at His leisure, keeping watch with gentle sweep.\n\nWith the light of your love, my life is illuminated bright,\nBecome my companion, complete my devotion, and make everything right.\n\n**Why this works:**\n\n*   **Imagery:** It uses beautiful imagery of the moon, stars, flowers, honey, morning rays, and pearls to create a romantic and magical atmosphere.\n*   **Flattery:** It praises her beauty, her voice, her laughter, and her presence in his life.\n*   **Deep Emotion:** It expresses longing, admiration, and a desire to spend life together.\n*   **Spiritual Tone:** There's a hint of spirituality, suggesting that she's divinely made and included in his prayers.\n*   **Simple Language:** The language is relatively simple and easy to understand, even for those who don't know Hindi fluently (especially with the transliteration).\n*   **Rhyme and Rhythm:** The shayari has a good rhyme and rhythm, making it pleasant to listen to.\n*   **\"Bandagi\" (Devotion):** This word adds a layer of depth, suggesting that his love for her is almost a form of worship.\n*   **\"Humsafar\" (Companion):** This term is romantic.\n\n**Tips for Delivery:**\n\n*   **Say it with sincerity:** The most important thing is to deliver the shayari with genuine emotion.\n*   **Maintain eye contact:** If you're saying it in person, maintain eye contact to show your sincerity.\n*   **Speak slowly and clearly:** Make sure she understands every word.\n*   **Smile:** A warm smile will make the shayari even more heartwarming.\n\nI hope this shayari brings a bright smile to her face and expresses your feelings in a beautiful way. Good luck!\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Please generate a beautiful and rhyming shayari for my crush, expressing deep love and admiration. It should be heartwarming, romantic, and bring a bright smile to her face. Make it magical and unforgettable!\nonly max 7 to 8 lines and do not add any other words and special characters \n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "तेरी आँखों में डूबा, मेरा जहाँ है,\nतू ही तो मेरी, रूह का समां है।\n\nचाँद भी फीका, तेरी नूर के आगे,\nदिल मेरा बंधा, तेरे प्यार के धागे।\n\nहर दुआ में, तेरा नाम है शामिल,\nतू मिले तो, मुकम्मल हो मेरा दिल।\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Please generate a beautiful and rhyming shayari for my crush, expressing deep love and admiration. It should be heartwarming, romantic, and bring a bright smile to her face. Make it magical and unforgettable!\nonly max 7 to 8 lines and do not add any other words and special characters and also use emojis with it\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "तेरी हँसी 💖, जैसे सुबह की किरण ☀️,\nतू ही तो है 👸, मेरे दिल की धड़कन ❤️।\n\nचाँद 🌙 भी शर्माए ✨, तेरी नूर से,\nदिल ये दीवाना 💘, तेरे प्यार में खोए 💫।\n\nहर दुआ में 🤲, तेरा नाम है शामिल 😇,\nतू मिले तो 🤝, मुकम्मल हो मेरा दिल 🥰।\n"},
          ],
        },
      ],
    });
 