import torch
import time
from transformers import AutoTokenizer, AutoModelForCausalLM

# Prompt for generating Fibonacci array
prompt = "Write a python function that sorts an array alphabetically"

# Hugging Face Transformers (Salesforce CodeGen Model)
def generate_with_huggingface(prompt):
    # Initialize tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained("Salesforce/codegen-350M-multi")
    model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen-350M-multi")
    
    # Check if GPU is available
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)

    # Tokenize input
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    
    # Measure metrics: time and memory
    start_time = time.time()
    initial_memory = torch.cuda.memory_allocated(device) if device.type == "cuda" else 0

    # Generate code
    with torch.no_grad():
        outputs = model.generate(inputs["input_ids"], max_length=400, num_return_sequences=1)

    # Measure metrics: time and memory after generation
    end_time = time.time()
    execution_time = end_time - start_time
    final_memory = torch.cuda.memory_allocated(device) if device.type == "cuda" else 0
    memory_used = final_memory - initial_memory

    # Decode generated code
    generated_code = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Return generated code and metrics
    return generated_code, execution_time, memory_used if device.type == "cuda" else None


if __name__ == "__main__":
    # Hugging Face Generation
    print("Generating code with Hugging Face Transformers (CodeGen)...")
    hf_code, exec_time, mem_used = generate_with_huggingface(prompt)

    # Print generated code
    print("\nHugging Face Code:\n")
    print(hf_code)

    # Print metrics
    print("\n--- Benchmarking Metrics ---")
    print(f"Execution Time: {exec_time:.4f} seconds")
    if mem_used is not None:
        print(f"Memory Used: {mem_used / (1024 ** 2):.2f} MB")
    else:
        print("Memory Used: N/A (Running on CPU)")
