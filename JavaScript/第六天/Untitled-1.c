#include <stdio.h>
int main()
{
    int i;     //定义循环变量
    int s = 0; //定义累加求和
    i = 1;
    while (i <= 100)
    {
        s = s + i; //将i的值累加到s里
        // s+=i;
        i = i + 1; //使i的值不断加1
                   // i++;
    }
    printf("%d\n", s);
    return 0;
}
