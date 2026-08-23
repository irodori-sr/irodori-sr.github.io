const form = document.querySelector("#diagnosisForm");
const result = document.querySelector("#result");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const resultAdvice = document.querySelector("#resultAdvice");
const scoreBar = document.querySelector("#scoreBar");
const retryButton = document.querySelector("#retryButton");

const resultMessages = [
  {
    min: 90,
    title: "かなり安定しています",
    text: "基本的な運営管理は整っています。今後は担当者だけに知識が偏らないよう、資料化と定期点検を続けると安心です。"
  },
  {
    min: 70,
    title: "おおむね良好です",
    text: "大きな不安は少なそうですが、いくつか確認したい項目があります。気になるところから順番に整えていきましょう。"
  },
  {
    min: 40,
    title: "見直しのタイミングです",
    text: "日々の運営で後回しになりやすい項目が残っています。給与、加算、労務書類の優先順位をつけて確認するのがおすすめです。"
  },
  {
    min: 0,
    title: "早めの整理がおすすめです",
    text: "社長や担当者が一人で抱えている可能性があります。処遇改善加算、給与計算、労務管理の土台から整理していきましょう。"
  }
];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const questions = Array.from(document.querySelectorAll(".question"));
  const weakPoints = [];
  let yesCount = 0;

  questions.forEach((question) => {
    const selected = question.querySelector("input:checked");
    if (selected?.value === "yes") {
      yesCount += 1;
      return;
    }

    weakPoints.push({
      category: question.dataset.category,
      advice: question.dataset.advice
    });
  });

  const score = Math.round((yesCount / questions.length) * 100);
  const message = resultMessages.find((item) => score >= item.min);

  resultTitle.textContent = `${score}点：${message.title}`;
  resultText.textContent = message.text;
  scoreBar.style.width = `${score}%`;

  resultAdvice.innerHTML = "";
  const adviceItems = weakPoints.length
    ? weakPoints
    : [{ category: "次の一歩", advice: "今の状態を維持するため、半年に一度の運営点検をおすすめします。" }];

  adviceItems.slice(0, 5).forEach((item) => {
    const advice = document.createElement("div");
    advice.className = "advice-item";
    advice.innerHTML = `<strong>${item.category}</strong><span>${item.advice}</span>`;
    resultAdvice.append(advice);
  });

  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});

retryButton.addEventListener("click", () => {
  form.reset();
  result.hidden = true;
  scoreBar.style.width = "0%";
  document.querySelector("#check").scrollIntoView({ behavior: "smooth", block: "start" });
});
