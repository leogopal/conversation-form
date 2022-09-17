import { ConversationalForm } from "conversational-form";

/** Every time the user submits an answer */
function answerSubmittedHandler(dto, success, error) {
  const conversation = dto.input.cfReference;
  if (
    dto.tag.name === "firstName" &&
    dto.text.toLowerCase().indexOf("charles") >= 0
  ) {
    // conversation.addRobotChatResponse('GET OUT OF HERE CHARLES')
    // return error('NO CHARLES ALLOWED')
  }

  console.log(conversation, "Form data so far", conversation.getFormData(true));
  success();
}

/** After the last question has been answered */
function conversationFinishedHandler(conversation) {
  const formData = conversation.getFormData(true);
  console.log("Form data: ", formData);
  conversation.addRobotChatResponse("You are done, here is the data collected");
  conversation.addRobotChatResponse(JSON.stringify(formData, null, 2));
  // Do something actually useful with the data
}

new ConversationalForm({
  formEl: document.getElementById("sample-conversation"),
  flowStepCallback: answerSubmittedHandler,
  submitCallback: conversationFinishedHandler,
  theme: "dark",
  showProgressBar: true
});
