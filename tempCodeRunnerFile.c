#include <stdio.h>
#include <string.h>

void crc(char *data, char *generator, char *result) {
    int data_len = strlen(data);
    int gen_len = strlen(generator);
    char temp[100], remainder[100];
    
    strcpy(temp, data);
    // Append zeros to data (length of generator - 1)
    for(int i = 0; i < gen_len - 1; i++) {
        temp[data_len + i] = '0';
    }
    temp[data_len + gen_len - 1] = '\0';
    
    strcpy(remainder, temp);
    
    // XOR division
    for(int i = 0; i <= strlen(temp) - gen_len; i++) {
        if(remainder[i] == '1') {
            for(int j = 0; j < gen_len; j++) {
                remainder[i + j] = (remainder[i + j] == generator[j]) ? '0' : '1';
            }
        }
    }
    
    // Copy remainder to result
    strcpy(result, remainder + data_len);
}

int main() {
    char data[100], generator[100], result[100];
    
    printf("Enter data bits: ");
    scanf("%s", data);
    printf("Enter generator bits: ");
    scanf("%s", generator);
    
    crc(data, generator, result);
    
    printf("CRC remainder: %s\n", result);
    
    // Append CRC to original data
    strcat(data, result);
    printf("Transmitted data: %s\n", data);
    
    return 0;
}