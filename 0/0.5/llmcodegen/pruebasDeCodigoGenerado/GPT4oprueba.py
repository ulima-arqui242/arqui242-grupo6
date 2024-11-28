def sort_strings_alphabetically(strings):
    """
    Sort an array of strings alphabetically.
    
    Args:
        strings (list): A list of strings to be sorted.
    
    Returns:
        list: The sorted list of strings.
    """
    return sorted(strings)

#ejemplo
example_strings = ["banana", "apple", "cherry", "date"]
sorted_strings = sort_strings_alphabetically(example_strings)
print(sorted_strings)  # Output: ['apple', 'banana', 'cherry', 'date']
