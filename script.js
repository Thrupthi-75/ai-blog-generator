async function generateBlog() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("output");
  const loading = document.getElementById("loading");
  const button = document.getElementById("generateBtn");

  if (!prompt) {
    alert("Please enter a topic");
    return;
  }

  loading.innerText = "✨ Generating your blog... please wait";
  output.innerHTML = "";

  button.disabled = true;
  button.innerText = "Generating...";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "AI Blog Generator"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a well-structured 1000 word blog with headings and paragraphs on: ${prompt}`
          }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      output.innerText = "API Error: " + JSON.stringify(data);
      return;
    }

    const blog = data.choices[0].message.content;

    output.innerHTML = `
      <h2 style="color:#444;">📝 Generated Blog</h2>
      <div style="margin-top:10px;">
        ${blog.replace(/\n/g, "<br><br>")}
      </div>
    `;

  } catch (error) {
    console.error(error);
    output.innerText = "Error generating blog. Try again.";
  }

  loading.innerText = "";
  button.disabled = false;
  button.innerText = "Generate Blog";
}
