#include <fstream>
#include <string>
#include <cmath>
#include <thread>
#include <chrono>
#include <iostream>

using namespace std;

// File paths
string lockFile = "../shared-data/lock.txt";
string mainFile = "../shared-data/main.txt";
string resultFile = "../shared-data/result.txt";

// Read lock value
string readLock() {
    ifstream file(lockFile);
    string value;
    if (file.is_open()) {
        getline(file, value);
        file.close();
    }
    return value;
}

// Write lock value
void writeLock(string value) {
    ofstream file(lockFile);
    if (file.is_open()) {
        file << value;
        file.close();
    }
}

// Read main.txt
void readMainFile(string &operation, double &val1, double &val2, double &val3) {
    ifstream file(mainFile);
    if (file.is_open()) {
        getline(file, operation);
        string line;
        getline(file, line);
        val1 = stod(line);
        getline(file, line);
        val2 = stod(line);
        getline(file, line);
        val3 = stod(line);
        file.close();
    }
}

// Write result.txt
void writeResult(string result) {
    ofstream file(resultFile);
    if (file.is_open()) {
        file << result;
        file.close();
    }
}

// Calculate FD
double calculateFD(double principal, double rate, double time) {
    // A = P * (1 + r/100)^t
    double amount = principal * pow((1 + rate / 100), time);
    return amount;
}

// Calculate Loan EMI
double calculateEMI(double principal, double rate, double time) {
    // Convert annual rate to monthly rate
    double r = rate / (12 * 100);
    // Convert years to months
    double n = time * 12;
    
    // EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
    double emi = (principal * r * pow(1 + r, n)) / (pow(1 + r, n) - 1);
    return emi;
}

int main() {
    cout << "C++ Processor started. Waiting for operations..." << endl;
    
    while (true) {
        string lock = readLock();
        
        if (lock == "1") {
            // Read operation from main.txt
            string operation;
            double val1, val2, val3;
            readMainFile(operation, val1, val2, val3);
            
            string result;
            
            if (operation == "FD") {
                double amount = calculateFD(val1, val2, val3);
                result = "FD Maturity Amount = " + to_string((int)amount);
            } else if (operation == "LOAN") {
                double emi = calculateEMI(val1, val2, val3);
                result = "Loan EMI = " + to_string((int)emi);
            }
            
            // Write result
            writeResult(result);
            
            // Release lock
            writeLock("0");
        }
        
        // Sleep for 50ms
        this_thread::sleep_for(chrono::milliseconds(50));
    }
    
    return 0;
}
