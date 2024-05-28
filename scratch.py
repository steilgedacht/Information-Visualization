
import csv

def filter_csv(input_file, output_file):
    with open(input_file, 'r') as csv_file:
        reader = csv.reader(csv_file)
        header = next(reader)  # Read the header
        data = [row for i, row in enumerate(reader) if i % 50 == 0]  # Keep every 50th entry
        
    with open(output_file, 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(header)  # Write the header
        writer.writerows(data)   # Write the filtered data

if __name__ == "__main__":
    input_filename = "src/data/settles.acl16.learning_traces.13m.csv"  # Change to the name of your input CSV file
    output_filename = "src/data/language_small.csv"  # Change to the name you want for the output CSV file
    filter_csv(input_filename, output_filename)