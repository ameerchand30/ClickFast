const postData = async () => {
    const url = "https://672e1217229a881691eed80f.mockapi.io/scores";
  
    const data = {
      createdAt: new Date().toISOString(),
      username: "JohnDoe",
      avatar:
        "https://w7.pngwing.com/pngs/364/361/png-transparent-account-avatar-profile-user-avatars-icon-thumbnail.png",
      score: 24 ,
      website_url: "https://chernam03.github.io/test_devops/",
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      console.log("Data posted successfully:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  
  postData();