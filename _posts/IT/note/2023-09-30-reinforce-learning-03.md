---
title: "[강화학습] 3주 수업"
author: dapin1490
date: 2023-09-30 17:52:00 +09:00
categories: [IT, note]
tags: [지식, IT, 강화학습]
render_with_liquid: false
---

<style>
  figure { text-align: center; }
</style>

### table of contents
- [복습](#복습)
- [Returns (Utility)](#returns-utility)
- [policy](#policy)
- [blackjack dice](#blackjack-dice)
- [iteration 구하기](#iteration-구하기)

## 복습
policy($\pi$): 상태에서 행동으로 매핑함.

* deterministic과 stochastic의 차이: 전자는 상태가 정해지면 행동도 정해지는 것이다. 후자는 상태에 따라서 하는 행동이 조금씩 달라진다. 지금은 deterministic의 관점에서 볼 것이다.

어떤 상태에서 어떤 행동을 했을 때, 그 행동이 항상 같은 가치를 가져오지 않는다. value function은 $q_{\pi}(s, a)$로 쓴다.

## Returns (Utility)
$G_{t}$를 미래에 얻을 수 있는 이득의 총합이라고 한다. 내 행동에 대한 $G_{t}$를 가치라고 한다. 여기서 "현재 얻는 이득"과 "미래에 얻을 이득"을 서로 다르게 반영하기 위해 discount factor(이하 d.f.)를 사용한다. d.f.가 1에 가까울 수록 미래를 중시하고 0에 가까울 수록 현재를 중시하며, 이 값은 사람이 정한다.

강의자료에서는 $G_{t}$를 Return이라고 하며, utility라고 부르기도 한다.

3주 강의자료 4페이지 하단 식 참고. $G_{t}$ 시점에서 미래의 이득을 공통인수 d.f.로 묶으면 그 안의 식은 $G_{t+1}$이 된다. 고로 $G_{t} = R_{t + 1} + \gamma G_{t + 1}$이다.

## policy
* policy($\pi$): 현재 상태에서 다음 행동을 고르는 것
* action-value function: 그 행동에 따라 전이될 상태를 정하는 것
* 지금 상태에서 내가 얻을 가치의 기댓값: (모든 행동을 할 확률) x (모든 행동으로 얻을 이익)

    $\rightarrow v_{\pi}(s) = \sum_{a}\pi(s)\sum p\times (r+\gamma v_{\pi}(s'))$

## blackjack dice
* 플레이어는 hit, stay 중 하나를 선택할 수 있다.
* stay를 선택할 경우 10달러를 받고 게임이 끝난다.
* hit를 선택할 경우 4달러를 받고 주사위를 던진다.
    * 주사위 눈이 1 또는 3일 경우 다음 턴에 다시 행동할 수 있다.
    * 주사위 눈이 1 또는 3이 아닐 경우 게임이 끝난다.

이 게임에서 갖는 요소는 다음과 같다.
* $S = \left\{ start, finish \right\}$
* $A = \left\{ Hit, Stay \right\}$

위 게임에 대해 transition graph를 그리면 다음과 같다. 상태는 원 안에 이름, 행동은 점과 이름(그냥 원 안에 써도 되긴 함 교수님은 신경 안 썼음), 행동에 따른 보상은 확률과 보상 순서로 표기하면 된다.

![transition graph.svg](/assets/img/category-it/230930-1-transition-graph.svg)

transition table도 그릴 수 있다. *(시험볼 때 그릴 수 있어야 한다고 했음)*

| `s` | `a` | `s'` | `p` | `r` |
|:-:|:-:|:-:|:-:|:-:|
| start | hit | finish | $\frac{1}{3}$ | $4 |
| start | hit | start | $\frac{2}{3}$ | $4 |
| start | stay | finish | $1$ | $10 |

* `s`: 지금 상태
* `a`: 이제 할 행동
* `s'`: 다음 상태
* `p`: 다음 상태가 `s'`이 될 확률
* `r`: 행동에 따른 보상

각 상태별로 행동에 따라 받을 수 있는 보상의 기댓값은 다음과 같은 식으로 구할 수 있다. 아래 식은 stay에 대한 각 상태에서의 기댓값을 구하는 식이다.

$v_{stay}(s) = \sum_{s', r}p(s', r|s, a)[r + \gamma v_{\pi}(s')]$

* $s = finish$일 때 $v_{stay}(finish) = 0$이다.
* $s = start$일 때 $v_{stay}(start) = 1 \times (10 + \gamma v_{\pi}(finish)) = 10$이다.

hit에 대한 기댓값도 stay만 hit로 바꿔서 같은 식으로 계산하면 된다.

* $s = finish$일 때 $v_{hit}(finish) = 0$이다.
* $s = start$일 때 $v_{hit}(start) = \frac{1}{3} \times [4 + \gamma v_{hit}(finish)] + \frac{2}{3} \times [4 + \gamma v_{hit}(start)]$이고,  
    정리하면 $v_{hit}(start) = \frac{4}{3} + \frac{2}{3} \times [4 + \gamma v_{hit}(start)]$이다.  
    $\gamma = 1$이라고 할 때, $v_{hit}(start) = 12$이다.

계산 결과를 정리하면

* stay를 할 경우 예상되는 가치는 10
* hit을 하면 예상되는 가치는 12

이 경우 모델은 hit를 선택한다. 여기까지가 기본적인 MDP 모델이다.

## iteration 구하기
**시험에 나오기 좋다**

위와 같은 모델을 실제 코드로 쓰면 대충 다음과 같은 모양새가 된다.

$for \; ----- \\ \;\;\;\; for \; each \; s' \\ \;\;\;\; \;\;\;\; v_{\pi}^{t}(s) = \sum p[r + \gamma v_{\pi}(s)^{t - 1}]$

필요한 것은 $v_{\pi}^{t}(s)$의 값이다. ($\gamma$는 1이라고 치자)

처음엔 $v_{\pi}^{t} = 0$에서 시작해 $|v_{\pi}^{t} - v_{\pi}^{t - 1}| \leq \bigcirc$가 될 때까지 한다. *설명은 따로 못들었는데 $\bigcirc$는 사용자 필요에 따라 지정하는 종료 시점인 것 같음. 학습할 수록 값이 수렴할 테니 직전 값과 얼마나 차이날 때를 '수렴했다'고 인정할지 정하는 수.*

블랙잭 다이스 게임으로 $v_{hit}(start)$를 계산하면 다음과 같다. $v_{\pi}^{0}(start) = 0$이고 $v_{\pi}(finish) = 0$이다.

1. $1_{st} \: iter(t = 1): v_{\pi}^{1}(start) = \frac{1}{3}[4 + v_{\pi}^{t - 1}(finish)] + \frac{2}{3}[4 + v_{\pi}^{t - 1}(start)] = 4$
2. $2_{nd} \: iter(t = 2): v_{\pi}^{2}(start) = \frac{1}{3}[4 + 0] + \frac{2}{3} [4 + v_{\pi}^{1}(start)] = \frac{20}{3}$
3. 이후 생략

이 과정을 반복하면 $v_{\pi}$는 특정 값으로 수렴할 것이다.

그러나 이 과정의 시간 복잡도가 대략 $n^{3}$ 정도 나온다. 아주 안 좋은 거다. 여기서 "최선의 행동"을 찾으려고 하면 한 번 더 해야 하기 때문에 더 오래 걸린다. 고로 이를 좀 더 효율적으로 구하는 방법이 있는데 그건 다음에 배운다.