interface PredefinedPrompt {
  label: string;
  value: string;
}

const predefinedPrompts: PredefinedPrompt[] = [
  { label: "Login Form", value: "Build a login form in React with validation" },
  { label: "Data Table", value: "Implement a sortable and filterable data table using MUI" },
  { label: "Markdown Editor", value: "Build a live markdown editor with preview panel" },
  { label: "Password Generator", value: "Create a secure random password generator in JS" },
  { label: "Calculator", value: "Implement a basic calculator with add, subtract, multiply, divide" },
];

export { predefinedPrompts };