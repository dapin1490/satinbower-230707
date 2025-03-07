---
title: "elastic cloud 시작하기"
author: dapin1490
date: 2023-07-16 11:41:00 +09:00
categories: [IT, note]
tags: [지식, IT, elastic, elasticsearch, bigdata, cloud]
render_with_liquid: false
---

### Table of Contents
- [강의 정보](#강의-정보)
- [관련 글](#관련-글)
- [elastic cloud](#elastic-cloud)
- [getting started elastic cloud](#getting-started-elastic-cloud)

## 강의 정보
* AWS x 경희대 캠퍼스타운 여름 AWS 특강
* 강의자: 주식회사 로이드케이

## 관련 글
* [elasticsearch 시작하기](https://dapin1490.github.io/satinbower/posts/elasticsearch-starter/)

## elastic cloud
사용자가 직접 데이터 센터를 지어 서버를 운영하는 것은 온프레미스(On-premis)라고 한다. 그리고 이 데이터 센터를 기반으로 자체 장비를 갖추고 가상 컴퓨터를 작동시키는 가상 환경을 VM이라고 한다. 클라우드는 사용자가 자신의 데이터 센터를 갖지 않고, 서버나 네트워크 등을 가상화 환경으로 만들어 인프라 자원을 제공하는 IaaS, 애플리케이션 및 코드를 위한 환경과 플랫폼을 제공하는 PaaS, 웹 브라우저나 애플리케이션을 인터넷을 통해 관리하게 하는 SaaS로 나뉜다. 간략하게 말하자면 클라우드 제공자가 먼저 갖추어둔 데이터 센터의 자원을 빌려 사용자가 자신의 서버를 운영하는 것을 클라우드라고 통칭하는 것이다.

elastic cloud는 elasticsearch를 사용할 수 있는 클라우드 서비스로 [https://www.elastic.co/kr/cloud/](https://www.elastic.co/kr/cloud/)에서 회원가입 및 라이선스 결제 후 이용할 수 있다. 회원가입 후 첫 14일간은 기간 한정 무료로 이용 가능하다.

elastic cloud는 클러스터와 노드로 구성된다. 사용자의 입장에서 클러스터는 하나의 큰 서버이고, 노드는 내부적으로 원본과 복제본으로 이루어진 부분 서버라고 볼 수 있다. elastic은 고가용성을 유지하고 장애가 생겼을 때에도 서비스에 영향이 없도록 하기 위해 하나의 서버를 구성하는 데이터를 여러 조각으로 나누어 분산시키고, 복제본도 다수 만들어 분산시켜둔다. 이 원본과 복제본의 조각들을 저장한 컴퓨터 한 대가 노드이고, 이 노드가 모여서 완성되는 하나의 서버가 클러스터라고 보면 된다.

클러스터를 처음 생성할 때 노드 수의 기본값은 3개이다. 각 노드는 다양한 역할을 수행하고 분담할 수 있는데, 이중 하나가 다른 노드를 제어하는 커맨더 역할의 마스터 노드가 된다. 사용자의 설정에 따라 노드가 주로 수행할 작업이 달라지며, 모든 노드는 기본적으로 코디네이터 기능이 true로 설정되어 있다. 코디네이터는 사용자의 쿼리에 대답하는 기능인데, 어떤 노드든 사용자의 질의에 답할 준비가 되어 있어야 하기 때문이라고 한다. 그런 이유로 코디네이터 기능은 설정에서 on/off가 불가능하며, 특정 노드를 오롯이 코디네이터로 쓰고 싶다면 다른 모든 역할 설정을 off 하면 된다.

클러스터 내부의 모든 노드는 유일한 이름으로 구분되며, 소속된 클러스터가 같다면 노드의 이름은 중복될 수 없다. 클러스터가 다르다면 노드 이름이 같아도 무방하다.

elastic cloud의 데이터는 인덱스라는 형태로 저장되는데, 이중 시스템과 관련된 정보가 자동으로 생성되어 저장된 것을 히든 인덱스라고 하며 인덱스 이름 앞에 `.`이 붙어 있다. 히든 인덱스는 함부로 삭제하면 돌이킬 수 없고 복제도 없으니 건드리지 않는 게 신상에 좋다.

## getting started elastic cloud
아직 elastic cloud의 계정도 없다는 전제로, 대략 다음과 같은 과정을 따르면 된다.

1. [https://cloud.elastic.co/home](https://cloud.elastic.co/home)에서 회원가입
2. 회원가입이 완료되면 첫 번째 클러스터를 생성하게 한다. 이름을 입력하고 create가 쓰여 있는 버튼을 클릭하면 클러스터가 생성된다.  
    이름 입력란 아래에 있는 것은 이 클러스터가 어느 데이터 센터를 사용할지 정하는 것으로 굳이 바꾸지 않아도 사용하는 데에는 문제가 없다. 다만 한번 생성한 후에는 바꿀 수 없다.
3. 클러스터를 생성하는 화면에 들어가면 username과 password를 보여주는데, 웹으로 클라우드를 사용하면 쓰게 일은 없을 테지만 클라우드 접근에 필요한 로그인 정보이니 저장해두는 게 좋다. 이 정보는 딱 지금 한 번만 보여준다.
4. 클라우드 생성이 완료되면 화면 우상단에 continue 버튼이 활성화된다. 이때 버튼을 클릭하여 새로운 화면이 뜨는 것을 확인한 후 다시 1번의 사이트에 접속하면 화면 좌상단에 Deployment라는 표가 생기고, 여기서 생성한 클러스터를 확인할 수 있다. 이 화면에서 Manage를 클릭하면 클러스터에 대한 설정을 할 수 있고, Open을 누르면 클러스터로 작업을 할 수 있다.

이제 elastic cloud를 사용할 수 있게 되었다. 이게 정말 다양하고 많은 기능들이 있는데, 지금 다 설명하기엔 너무 많고 다음에 다시 보자.