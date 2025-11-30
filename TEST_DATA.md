# Example Test Data

## Sample users.txt format

```
john123,password123
alice456,mypass456
bob789,secret789
```

## Sample account file format (e.g., john123.txt)

```
5000
```

## How the lock system works

### lock.txt states:

- `0` = Free (available for use)
- `1` = Locked (currently processing)

### main.txt format for FD:

```
FD
10000
7
5
```

### main.txt format for LOAN:

```
LOAN
100000
10
2
```

### result.txt format:

```
FD Maturity Amount = 14025
```

or

```
Loan EMI = 4614
```

## Testing Tips

1. **Create Test User**

   - User ID: `test123`
   - Password: `pass123`

2. **Test Deposit**

   - Amount: `5000`
   - Expected: Balance becomes 5000

3. **Test Withdraw**

   - Amount: `1000`
   - Expected: Balance becomes 4000

4. **Test FD Calculator**

   - Principal: `10000`
   - Rate: `7`
   - Time: `5`
   - Expected: `FD Maturity Amount = 14025`

5. **Test Loan Calculator**
   - Loan Amount: `100000`
   - Annual Rate: `10`
   - Time: `2`
   - Expected: `Loan EMI = 4614`

## File Locations

All user data stored in:

- `backend/database/users.txt` - User credentials
- `backend/database/accounts/[userid].txt` - User balances
- `backend/shared-data/lock.txt` - Synchronization
- `backend/shared-data/main.txt` - Input data
- `backend/shared-data/result.txt` - Output data
