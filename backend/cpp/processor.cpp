#include <fstream>
#include <string>
#include <cmath>
#include <thread>
#include <chrono>
#include <iostream>
#include <sys/stat.h>

using namespace std;

string inputPath = "../shared-data/main.txt";
string outputPath = "../shared-data/result.txt";

bool fileExists(const string &path)
{
    struct stat buffer;
    return (stat(path.c_str(), &buffer) == 0);
}

long getFileModTime(const string &path)
{
    struct stat buffer;
    if (stat(path.c_str(), &buffer) == 0)
    {
        return buffer.st_mtime;
    }
    return 0;
}

bool readInput(string &operation, double &principal, double &rate, double &time)
{
    ifstream file(inputPath);
    if (file.is_open())
    {
        getline(file, operation);
        if (operation.empty())
        {
            file.close();
            return false;
        }
        string line;
        getline(file, line);
        principal = stod(line);
        getline(file, line);
        rate = stod(line);
        getline(file, line);
        time = stod(line);
        file.close();
        return true;
    }
    return false;
}

void saveResult(string result)
{
    ofstream file(outputPath);
    if (file.is_open())
    {
        file << result;
        file.close();
    }
}

double calcFD(double principal, double rate, double time)
{
    return principal * pow(1 + rate / 100, time);
}

double calcLoan(double principal, double rate, double time)
{
    double monthlyRate = rate / (12 * 100);
    double months = time * 12;
    return (principal * monthlyRate * pow(1 + monthlyRate, months)) / (pow(1 + monthlyRate, months) - 1);
}

int main()
{
    cout << "Started processor..." << endl;

    long lastModTime = 0;

    while (1)
    {
        if (fileExists(inputPath))
        {
            long currentModTime = getFileModTime(inputPath);

            // Process only if file has been modified
            if (currentModTime > lastModTime)
            {
                // Small delay to ensure file write is complete
                this_thread::sleep_for(chrono::milliseconds(10));

                string operation;
                double principal, rate, time;

                if (readInput(operation, principal, rate, time))
                {
                    string result;

                    if (operation == "FD")
                    {
                        double amount = calcFD(principal, rate, time);
                        result = "FD Maturity Amount = " + to_string((int)amount);
                    }
                    else if (operation == "LOAN")
                    {
                        double emi = calcLoan(principal, rate, time);
                        result = "Loan EMI = " + to_string((int)emi);
                    }

                    saveResult(result);
                    lastModTime = currentModTime;
                }
            }
        }

        this_thread::sleep_for(chrono::milliseconds(50));
    }

    return 0;
}
