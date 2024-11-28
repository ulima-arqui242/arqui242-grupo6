from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the CodeGen model and tokenizer
model_name = "Salesforce/codegen-350M-mono"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define the prompt
prompt = "Write a Python function that sorts an array alphabetically:\n\n"

# Tokenize the input
inputs = tokenizer(prompt, return_tensors="pt")

# Generate the code
outputs = model.generate(
    inputs["input_ids"],
    max_length=100,
    num_return_sequences=1,
    pad_token_id=tokenizer.eos_token_id
)

# Decode and print the generated code
generated_code = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(generated_code)
