def sort_strings(arr):
    return sorted(arr, key=lambda x: x.lower())

# Ejemplo
strings = ["mango", "cherry", "banana", "apple"]
sorted_strings = sort_strings(strings)
print(sorted_strings)
