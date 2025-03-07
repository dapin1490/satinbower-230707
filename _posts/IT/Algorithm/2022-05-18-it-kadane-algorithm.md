---
title: 카데인 알고리즘
author: dapin1490
date: 2022-05-18 00:00:00 +09:00
categories: [IT, Algorithm]
tags: [지식, IT, 알고리즘, 동적계획법, 카데인알고리즘]
render_with_liquid: false
---

### 뭐 별 게 다 있어.. 프로그래머란 대체

-----

<br>

자 생각을 해보자. 어떤 배열에서 연속한 원소로 이루어진 부분 배열의 합의 최댓값을 찾고 싶다. 그런데 시간이 별로 없다. 이럴 때 쓰는 게 카데인 알고리즘이다. 이중 반복문으로 답을 찾는 브루트포스는 시간복잡도가 O(n²)이지만 이 알고리즘은 O(n)이다.  
  
<br><br>

### 목차
<p>1. 동적 계획법<br>
2. 카데인 알고리즘<br>
3. 백준 1912 연속합</p>
  
<br><br>
  
### 1. 동적 계획법
카데인 알고리즘을 배우기 위해서는 동적 계획법의 개념부터 알아야 한다. 말이 계획이지 사실 그리 계획적이지는 않은 동적 계획법이란 요약하자면 '컨닝페이퍼 만들기'이다.  
하나의 큰 문제를 아주 작은 부분으로 떼어낸다. 그리고 이 작은 문제를 해결한 다음 답을 적어둔다(→ 컨닝페이퍼). 이 답은 다른 작은 문제를 해결하는 데 사용한다. 작은 문제들을 해결해나가다 보면 어느샌가 큰 문제의 답이 나와있다. 그러나 재귀는 아니다. 말로만 설명하다 보니 좀 추상적인 것 같은데 정말로 동적 계획법은 이게 다다. 내가 이해한 대로 말하자면 딱 이렇게 이렇게 해라, 하고 코드가 정해진 알고리즘이 아니고 특정 부류의 문제에 대한 행동 지침 정도로 보면 된다. 내가 이 개념을 이해하는 데 몇 달은 걸렸으니 지금 이 설명을 보고 이해가 안 간다면 충분히 그럴 수 있으니 걱정하지 않아도 된다! 이런 건 다 감으로 익히는 거지 책만 본다고 될 일은 아니다.  
  
<br><br>

### 2. 카데인 알고리즘
처음부터 말했듯이 이 알고리즘이 해결할 수 있는 문제는 "어떤 배열에서 연속된 원소로 이루어진 부분 배열의 합의 최댓값 구하기"이다. 이제부터 내가 그 과정을 설명할 것이다. [참고 링크는 이 문장을 클릭하면 된다.](https://medium.com/@vdongbin/kadanes-algorithm-%EC%B9%B4%EB%8D%B0%EC%9D%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-acbc8c279f29)  
  
먼저 요약하자면, 앞에서부터(혹은 취향에 따라 뒤에서부터) 부분배열의 합이 더 큰지, 지금 검사하는 원소가 더 큰지 비교해서 가장 큰 값을 남기는 것이다. 이때 부분배열의 합을 구하는 방식은 "가장 긴 부분수열 찾기" 문제와 비슷하다(난 이거 풀이 글 쓴 줄 알았는데 아니더라.. 나중에 쓰겠습니다). 예를 들어보자.  
  
여기 작고 귀여운 배열이 있다. 설명하기에 앞서 답부터 스포일러하자면 12 + 21 = 33이다.  
  
`10, -4, 3, 1, 5, 6, -35, 12, 21, -1`  
  
그리고 여기에 저 원본 배열과 크기가 같은 빈 배열을 하나 더 만든다. 이것을 부분합 배열이라고 부르겠다.  
  
`0, 0, 0, 0, 0, 0, 0, 0, 0, 0`  
  
이제부터 부분 배열의 합을 계산하기 시작하면 된다.  
먼저 0번 원소부터 보자. 부분 배열은 0번 원소 1개가 다이니 부분 배열의 합도 10이다. 부분합 배열의 0번 원소에 10을 대입한다.  
  
`10, 0, 0, 0, 0, 0, 0, 0, 0, 0`  
  
이제 원본 배열의 다음 원소를 보자. 여기서 해야 할 것은 직전에 계산했던 부분배열의 끝에 이번 원소를 추가할 것인지, 추가하지 않고 새로운 부분 배열을 시작할 것인지 정하는 것이다. 우선 직전에 계산했던 부분 배열의 합은 10이고 여기에 이번 원소를 추가한다면 10 - 4 = 6이 된다. 그리고 이번 원소는 -4이다. 부분합 배열에는 6과 -4 중 큰 값을 대입하면 된다. 그러니까 6을 대입할 것이고, 이전에 계산했던 부분 배열의 뒤에 이번 원소를 추가했다는 뜻이다.  
  
`10, 6, 0, 0, 0, 0, 0, 0, 0, 0`  
  
이번에 검사할 원소는 2번, 3이다. 방금 한 계산과 마찬가지로 직전에 계산한 부분배열의 합에 더하는 게 더 큰지, 이 원소를 가지고 새로운 부분 배열을 시작하는 게 더 큰지 보면 된다. 추가한다면 6 + 3 = 9이고, 그렇지 않다면 3이다. 추가하는 게 더 크기 때문에 부분합 배열의 2번 원소에 9를 대입한다.  
  
`10, 6, 9, 0, 0, 0, 0, 0, 0, 0`  
  
이와 같은 방식으로 6번 원소까지 계산했다고 치자. 중간 과정을 생략하는 이유는 전부 부분 배열에 추가하는 게 더 커서 똑같은 설명만 할 것이기 때문이다. 6번 원소까지 계산하고 나면 부분합 배열은 아래와 같이 될 것이다.  
  
`10, 6, 9, 10, 15, 21, -14, 0, 0, 0`  
  
이제 검사할 원소는 7번이다. 이번에는 상황이 다르다. 직전에 계산된 부분 배열에 원소를 추가하느니 여기서부터 새 부분 배열을 시작하는 게 낫다. 식으로 쓰면 (-14 + 12)와 12의 대소비교를 하는 것과 같다. 그러므로 부분합 배열에는 7번 원소인 12를 그대로 대입한다. 이전까지 계산된 부분 배열을 버리고 새 부분 배열을 시작한 것이다.  
  
`10, 6, 9, 10, 15, 21, -14, 12, 0, 0`  
  
이 이후로 부분합 배열을 채우는 과정은 생략하겠다. 이미 했던 설명을 반복할 뿐이다. 결과는 다음과 같다.  
  
`10, 6, 9, 10, 15, 21, -14, 12, 33, 32`  
  
마지막으로 할 일은 부분합 배열에서 최댓값을 찾아 답을 구하는 것이다. 선형 탐색을 해도 되고, 라이브러리가 제공하는 정렬 함수를 써도 되고, 지금까지의 계산 과정에서 같이 비교해서 그때그때 최댓값을 찾아둬도 된다. 어쨌든 답은 처음에 말한 대로 33이다.  
  
<br><br>

### 3. 백준 1912 연속합
위 알고리즘을 활용해 풀 수 있는 문제이다. 예시도 이 문제의 예제에서 가져왔다. 과정은 다 알고 있으니 코드부터 보자. 포인터를 쓰다보니 재미들려서 이번에도 포인터 배열을 사용하긴 했지만 혹시 포인터에 대해 모른다면 그냥 크기를 자유자재로 만들 수 있는 배열을 만든 거라고 생각하면 된다.  
  
팁 : 배열같은 특정 공간 내에서 최댓값 또는 최솟값을 찾고자 할 때는 해당 공간 내의 원소로 최대/최솟값 변수를 초기화하는 게 좋다. 그렇게 하면 공간 내의 값의 범위를 신경쓰지 않아도 된다.  
개인적 취향 : 간단한 크기 비교와 대입만 할 거라면 if 대신 삼항연산자를 쓰는 것도 좋다. 줄 수가 줄어든다. 출력할 때에도 마찬가지로 어떤 조건에 따라 둘 중 하나의 값을 골라서 출력하는 상황이라면 삼항연산자를 활용해 한 줄에 선택과 출력을 모두 할 수 있다.  
  
```cpp
#include <iostream>
using namespace std;

int main()
{
    // 빠른 입출력
    ios::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);

    int n, maxi; // 각각 입력받을 숫자의 개수와 답으로 출력할 최댓값
    int* p; // 원본 배열을 저장할 포인터
    int* subp; // 부분합 배열을 저장할 포인터

    cin >> n; // 숫자 개수 입력받기
    p = new int[n]; // 포인터 배열 선언, 크기는 n
    subp = new int[n]; // 포인터 배열 선언, 크기는 n

    for (int i = 0; i < n; i++)
        cin >> *(p + i); // 원본 배열 입력받기
    *(subp + 0) = *(p + 0); // 부분합 배열의 0번 원소에 원본 배열의 0번 원소 대입
    maxi = *(subp + 0); // 최댓값 초기화

    for (int i = 1; i < n; i++) {
        *(subp + i) = (*(p + i) + *(subp + i - 1) > *(p + i)) ? *(p + i) + *(subp + i - 1) : *(p + i); // 삼항연산자로 대입했다. 의미는 이전에 설명한 논리와 같다.
        if (*(subp + i) > maxi) // 매번 최댓값을 비교해 업데이트
            maxi = *(subp + i);
    }

    cout << maxi;

    delete[] p; // 포인터 배열 해제
    delete[] subp; // 포인터 배열 해제

    return 0;
}
```  