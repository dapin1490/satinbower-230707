---
title: "나도 이제 네트워크 7계층 알아"
author: dapin1490
date: 2024-02-26 18:02:00 +09:00
categories: [IT, note]
tags: [지식, IT, 네트워크, 7계층]
render_with_liquid: false
---

<style>
  figure { text-align: center; }
</style>

<span class="green">* 모든 내용은 chatGPT한테 배웠음</span>

### Table of Contents
- [네트워크 7계층](#네트워크-7계층)
- [제1계층 물리](#제1계층-물리)
- [제2계층 데이터 링크](#제2계층-데이터-링크)
  - [MAC 주소](#mac-주소)
- [제3계층 네트워크](#제3계층-네트워크)
  - [IP 주소](#ip-주소)
  - [MAC 주소와 IP 주소의 차이](#mac-주소와-ip-주소의-차이)
- [제4계층 전송](#제4계층-전송)
  - [TCP (Transmission Control Protocol)](#tcp-transmission-control-protocol)
  - [UDP (User Datagram Protocol)](#udp-user-datagram-protocol)
  - [TCP와 IP를 묶어서 부르는 이유](#tcp와-ip를-묶어서-부르는-이유)
- [제5계층 세션](#제5계층-세션)
- [제6계층 표현](#제6계층-표현)
- [제7계층 응용](#제7계층-응용)
- [다음 기회에](#다음-기회에)

## 네트워크 7계층
네트워크란 마치 인터넷처럼 여러 기기들이 연결돼 정보를 주고받는 공간이다. 집 안에서도 컴퓨터, 스마트폰, 텔레비전 등이 연결돼 있으면 그것도 네트워크이다.

OSI (Open Systems Interconnection) 모델은 네트워크 통신 과정을 일곱 가지 계층으로 나눈 것인데, 이는 하드웨어에서부터 사용자가 경험하는 추상적인 서비스까지의 전체 통신 과정을 체계적으로 이해하기 위해 만들어진 것이다.

이 모델은 물리적인 하드웨어에서 데이터를 전송하고 수신하는 것부터 사용자가 실제로 사용하는 응용프로그램까지의 과정을 고려하여 설계되었다. 따라서 각 계층은 그 계층이 담당하는 역할과 관련된 기능들을 수행하며, 상위 계층으로 갈수록 추상화 수준이 높아지고 사용자에게 더 익숙한 서비스를 제공한다.

이런 구조를 통해 네트워크 시스템을 설계하고 개발할 때 각 계층을 독립적으로 고려하고 구현할 수 있으며, 상호 연동성과 유연성을 확보할 수 있다. 따라서 OSI 모델은 네트워크 시스템의 설계, 구현, 유지보수 등 다양한 측면에서 유용하게 활용된다.

## 제1계층 물리
노트북, 스마트폰과 같이 통신 기능이 있는 하드웨어가 이 계층에 포함된다. 데이터를 전기 신호로 변환하거나 광 신호로 변환하여 케이블이나 와이파이를 통해 실제로 데이터를 전달한다. 물리적인 연결과 전기적 신호를 다룬다.

## 제2계층 데이터 링크
물리적 계층을 구성하는 하드웨어를 MAC 주소를 통해 식별하고, 오류를 검출하고 수정하는 계층. 데이터를 신뢰성 있게 전달하는 역할을 한다.

### MAC 주소
* MAC 주소는 네트워크 인터페이스 카드(네트워크 어댑터)에 할당된 고유한 식별자.
* 네트워크 계층인 데이터 링크 계층에서 사용.
* 이 주소는 제조사에 의해 고유하게 부여되며, 네트워크 디바이스가 출하되는 시점에 결정된다.
* 일반적으로 12자리의 16진수로 표현되며, 예를 들어 "00:1A:2B:3C:4D:5E"와 같은 형식이다.
* 네트워크와 무관하게 하드웨어에 부여되는 주소, 불변.

## 제3계층 네트워크
하나의 통신 기기에서 다른 통신 기기로 데이터가 전달되는 경로를 탐색함. 수신자와 송신자를 구분하고 찾기 위해 IP 주소를 사용함.

### IP 주소
* 네트워크 상에서 컴퓨터 또는 네트워크 장비를 식별하는 데 사용되는 주소이다.
* 이 주소는 네트워크에 연결된 각 장치에게 부여되며, 그 장치가 속한 네트워크와 서브넷을 식별한다.
* IPv4의 경우 32비트로 표현되며, 일반적으로 `xxx.xxx.xxx.xxx`와 같은 형식이다. IPv6의 경우 128비트 주소를 사용하며, 일반적으로 `xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx`와 같은 형식이다.

### MAC 주소와 IP 주소의 차이
MAC 주소는 장치의 물리적인 주소이고, IP 주소는 장치의 논리적인 주소이다. MAC 주소는 데이터 링크 계층에서 사용되며, IP 주소는 네트워크 계층에서 사용된다.

만약 노트북의 와이파이를 바꾼다면 IP 주소는 바뀔 수 있지만 하드웨어로서의 노트북이 동일하기 때문에 MAC 주소는 바뀌지 않는다. 물리적인 네트워크 인터페이스 카드(네트워크 어댑터)의 MAC 주소는 하드웨어적으로 고정되어 있으므로 와이파이 변경과는 관련이 없지만, IP 주소는 네트워크에 따라 동적으로 할당되기 때문에 와이파이 변경에 따라 바뀔 수 있다.

## 제4계층 전송
네트워크 계층을 포함해, 서로 다른 두 통신 기기 사이에서 실제로 이루어지는 통신. 데이터의 전송을 관리하고, 오류를 수정하며, 흐름을 제어하는 역할을 한다. TCP는 통신 가능 여부, 데이터 정상 전송 여부 등을 확인하여 신뢰성 있는 전송을 보장하고, UDP는 신뢰성을 보장하지 않는 대신 신속함.

### TCP (Transmission Control Protocol)
* 신뢰성 있는 데이터 전송을 보장하는 연결 지향형 프로토콜이다.
* 데이터의 신뢰성을 보장하기 위해 데이터의 전송과정에서 발생하는 오류를 검출하고 복구한다.
* 데이터를 전송하기 전에 연결을 설정하고, 데이터 전송 후에 연결을 해제한다.
* 데이터를 보내면 상대편에서 확인 응답을 보내어 데이터가 정상적으로 전송되었는지 확인한다.
* 전송 중에 패킷의 순서를 보장하여 데이터가 순서대로 도착하도록 한다.
* 예를 들어, 파일 전송, 이메일 전송, 웹 브라우징 등에 주로 사용된다.

### UDP (User Datagram Protocol)
* 신속한 데이터 전송을 목적으로 하는 비연결형 프로토콜이다.
* 데이터를 전송하기 전에 연결을 설정하지 않으며, 데이터 전송 후에도 연결을 해제하지 않는다.
* 데이터 전송 중에 오류를 검출하거나 복구하지 않는다. 따라서 오류가 발생할 수 있으나, 이를 처리하지 않는다.
* 데이터를 전송할 때 추가적인 확인 응답이 없기 때문에 TCP보다 전송 속도가 빠르다.
* 순서가 보장되지 않으므로 데이터가 순서대로 도착하지 않을 수 있다.
* 예를 들어, 실시간 동영상 스트리밍, 온라인 게임, DNS(Domain Name System) 등에 주로 사용된다.

### TCP와 IP를 묶어서 부르는 이유
TCP와 IP는 서로 다른 프로토콜이며, 각각 전송 계층과 네트워크 계층에서 작동한다. 하지만 이 둘은 대부분의 네트워크 통신에서 함께 사용되어 TCP/IP라고 묶어서 언급된다. 이는 TCP와 IP가 서로 보완적으로 동작하여 효율적인 네트워크 통신을 제공하기 때문이다.

일반적으로, TCP는 데이터의 신뢰성을 보장하고 흐름을 제어하는 데 사용되며, 데이터가 순서대로 도착하고 중복되지 않도록 한다. 한편 IP는 데이터의 패킷 전달을 담당하고, 데이터를 목적지까지 경로에 따라 전송한다.

TCP는 IP 위에서 작동하므로, 이 둘은 함께 사용될 때 최적의 통신 솔루션을 제공한다. 따라서 TCP/IP라는 용어는 이 둘을 함께 언급하는 것이 일반적이다.

## 제5계층 세션
통신을 위한 세션을 설정하고 유지하는 것을 담당하고, 컴퓨터 간의 연결을 설정하고 관리하는 계층이다. 통신 기기가 네트워크에 연결되어 있는 상태 또는 시간을 세션이라 부를 수 있다. 세션에 연결되어 있어야 통신이 가능하다. 사용자와의 상호작용과 관련이 있다.

구글 코랩의 런타임 세션을 예로 들자. 코랩에서 런타임을 시작하면 컴퓨터(클라이언트)와 코랩 서버 간에 세션(연결)이 설정된다. 이 세션은 클라이언트와 서버 간의 통신을 가능하게 하며, 클라이언트가 코랩을 사용하는 동안 유지된다. 따라서 이 세션은 클라이언트와 서버 간의 상호작용을 관리하고, 필요할 때 세션을 종료하여 통신을 완전히 종료한다.

따라서 세션 계층은 데이터의 전송과는 직접적으로 관련이 없지만, 통신을 위한 연결을 설정하고 관리함으로써 전체 통신 과정에 중요한 역할을 한다.

## 제6계층 표현
데이터를 어떻게 표현하고 인코딩하고 압축하는지를 다루는 역할을 한다. 사용자와의 상호작용과 관련이 있다. 필요한 경우 데이터를 변환하거나 압축하는 역할을 한다.

PDF, JPG와 같이 데이터를 저장하는 형식이나 인코딩 방식은 표현 계층에서 다룰 수 있는 대표적인 예시이다. 예를 들어, PDF 형식으로 저장된 문서를 인터넷을 통해 전송할 때는 이 문서를 텍스트 데이터로 변환하고 압축하여 전송할 수 있다. 마찬가지로, JPG 이미지 파일을 전송할 때도 이를 특정한 방식으로 인코딩하고 전송할 수 있다.

표현 계층은 데이터의 형식을 표준화하고 상호 변환 가능하도록 함으로써 다양한 시스템 간의 상호 운용성을 제공한다. 따라서 PDF, JPG와 같은 데이터 형식을 다루는 것도 표현 계층의 주요 역할 중 하나이다.

## 제7계층 응용
사용자가 실제로 보게되는 서비스와 어플리케이션에 관련된 계층이다. 사용자와의 상호작용과 관련이 있다. 네트워크 서비스와 사용자 간의 인터페이스를 제공하며, 사용자가 네트워크를 통해 서비스를 이용할 수 있도록 한다.

크롬 브라우저나 메신저 앱과 같은 응용프로그램은 모두 응용 계층에 속한다. 이러한 프로그램은 사용자가 인터넷을 통해 정보를 검색하고 열람하거나, 메시지를 주고받는 등의 기능을 제공한다. 따라서 응용 계층은 사용자가 직접 사용하는 서비스와 어플리케이션을 다루는데, 이는 네트워크에서 가장 직접적으로 인식되는 부분 중 하나이다.

## 다음 기회에
* 라우팅: 데이터가 출발지에서 목적지까지 전달되는 경로를 결정하는 과정이다. 라우터가 데이터 패킷을 전달하는 방법에 대한 이해가 필요하다.
* 서브넷팅: IP 주소 공간을 더 작은 네트워크로 분할하는 프로세스이다. 서브넷 마스크와 서브넷 구성에 대한 이해가 필요하다.
* 네트워크 보안: 네트워크에서 데이터의 무단 접근, 변경, 손상을 방지하기 위한 기술과 방법론에 대한 이해가 필요하다. 방화벽, 암호화, 인증 등이 포함될 수 있다.
* 네트워크 프로토콜: OSI 모델과 TCP/IP 이외에도 다양한 네트워크 프로토콜이 있다. 예를 들어, HTTP, FTP, SMTP, SNMP 등이 있다.
* 네트워크 장비: 라우터, 스위치, 허브, 방화벽 등의 네트워크 장비에 대한 이해가 필요하다. 각 장비의 역할과 동작 방식을 알아야 한다.
* 클라우드 네트워킹: 클라우드 컴퓨팅 환경에서의 네트워킹과 관련된 개념과 기술에 대한 이해가 필요하다. 가상 네트워크, 가상 프라이빗 클라우드, 컨테이너 네트워킹 등이 포함될 수 있다.
* 네트워크 관리: 네트워크의 성능 모니터링, 문제 해결, 구성 관리 등과 관련된 개념과 도구에 대한 이해가 필요하다. SNMP, NetFlow, Syslog 등의 도구가 사용될 수 있다.
