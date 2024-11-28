import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

#  GPT-Neo 1.3B model
model_name = "EleutherAI/gpt-neo-1.3B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Prompt para los modelos
prompt = "Write a Python function that sorts an array alphabetically:\n\n"

# Tokenize
inputs = tokenizer(prompt, return_tensors="pt")

#generando codigo
with torch.no_grad():
    outputs = model.generate(
        inputs["input_ids"],
        max_length=300,
        num_return_sequences=1,
        pad_token_id=tokenizer.eos_token_id
    )

# Decodificar y print al resultado
generated_code = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(generated_code)
