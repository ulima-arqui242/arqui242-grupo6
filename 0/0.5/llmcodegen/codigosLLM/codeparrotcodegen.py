from transformers import AutoModelForCausalLM, AutoTokenizer

# cargar modelo
model_name = "codeparrot/codeparrot-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# prompt inicial
prompt = "Write a python function that sorts an array of strings alphabetically"

# Tokenize
inputs = tokenizer(prompt, return_tensors="pt")

# generar el codigo
outputs = model.generate(inputs["input_ids"], max_length=300, num_beams=5, early_stopping=True)

# decode y print
generated_code = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(generated_code)
