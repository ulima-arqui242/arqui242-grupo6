def sort_array(a):
        return sorted(a, key=lambda x: x[0])


data = [[3, "apple"], [1, "orange"], [2, "banana"]]
sorted_data = sort_array(data)
print(sorted_data)
