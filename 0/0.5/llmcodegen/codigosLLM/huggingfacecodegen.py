from transformers import AutoTokenizer, AutoModelForCausalLM
import cohere

# Prompt for generating Fibonacci array
prompt = "Write a python function that sorts an array alphabetically"

# Hugging Face Transformers (Salesforce CodeGen Model)
def generate_with_huggingface(prompt):
    tokenizer = AutoTokenizer.from_pretrained("Salesforce/codegen-350M-multi")
    model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen-350M-multi")

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(inputs["input_ids"], max_length=100, num_return_sequences=1)

    generated_code = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_code


if __name__ == "__main__":
    # Hugging Face Generation
    print("Generating code with Hugging Face Transformers (CodeGen)...")
    hf_code = generate_with_huggingface(prompt)
    print("\nHugging Face Code:\n")
    print(hf_code)

   
