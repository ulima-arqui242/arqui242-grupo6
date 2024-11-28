import openai

# api key
openai.api_key = "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"

# fibonacci
prompt = "Write a code based in Python, a function to generate a Fibonacci array of length n."

# call al api
response = openai.Completion.create(
    engine="gpt-3.5-turbo-instruct",  # Use "gpt-3.5-turbo" if supported
    prompt=prompt,
    max_tokens=100,
    temperature=0  # Lower temperature for more deterministic output
)

# Print the generated code
print("Generated Code:\n")
print(response.choices[0].text.strip())
