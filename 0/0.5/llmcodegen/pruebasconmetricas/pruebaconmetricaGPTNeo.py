import torch
import time
from transformers import AutoTokenizer, AutoModelForCausalLM

# Configuración del modelo GPT-Neo 1.3B
model_name = "EleutherAI/gpt-neo-1.3B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Prompt para el modelo
prompt = "Write a Python function that sorts an array of strings alphabetically:\n\n"

# Tokenización
inputs = tokenizer(prompt, return_tensors="pt")

# Verificar si se puede usar GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
inputs = inputs.to(device)

# Métricas: medir tiempo y memoria
start_time = time.time()

# Medir memoria inicial
initial_memory = torch.cuda.memory_allocated(device) if device.type == "cuda" else 0

# Generar código
with torch.no_grad():
    outputs = model.generate(
        inputs["input_ids"],
        max_length=300,
        num_return_sequences=1,
        pad_token_id=tokenizer.eos_token_id
    )

# Medir tiempo final y memoria usada
end_time = time.time()
execution_time = end_time - start_time

final_memory = torch.cuda.memory_allocated(device) if device.type == "cuda" else 0
memory_used = final_memory - initial_memory

# Decodificar y mostrar el código generado
generated_code = tokenizer.decode(outputs[0], skip_special_tokens=True)
print("Generated Code:\n")
print(generated_code)

# Mostrar métricas
print("\n--- Benchmarking Metrics ---")
print(f"Execution Time: {execution_time:.4f} seconds")
if device.type == "cuda":
    print(f"Memory Used: {memory_used / (1024 ** 2):.2f} MB")
else:
    print("Memory Used: N/A (Running on CPU)")
