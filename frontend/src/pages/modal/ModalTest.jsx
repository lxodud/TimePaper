import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import image from '../../assets/images/postitAfternoon.svg';

export default function ModalTest() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(image);
  const [from, setFrom] = useState('홍길동홍길홍길동');
  const [modalContent, setModalContent] = useState(
    'Java에 특정한 라이브러리를 가미해서 웹에서 돌릴 수 있게 한 것이 Java Applet이다. 애플릿 특유의 제약으로 인해 ActiveX보다는 훨씬 안전하다는 이유로 물 건너에서는 인터넷 뱅킹이나 결제 용도로 사용하기도 한다. 근데 상대적으로 안전하다는 것일 뿐 애플릿을 사용한 결제 시스템도 툭하면 뚫려서 문제가 발생하곤 한다(…). 더군다나 iOS와 안드로이드에서는 되지 않는다. 게다가 크롬과 파이어폭스 등의 브라우저들이 NPAPI 지원 중단 선언을 하고 Java 9부터 애플릿의 개발이 중단되면서 결국 수명이 끝나게 되었다. 이러한 점은 자바 애플릿만이 아닌 다른 대부분의 리치 인터넷 애플리케이션들의 또한 마찬가지이다. 웹 애플리케이션 제작을 위해 Java 언어를 사용하는 규격으로 Java 서블릿과 Java 서버 페이지가 있다. 주로 기업에서 Spring과 함께 사용한다. 개인 웹 호스팅에서는 이를 지원하는 경우는 많지 않다. 그러나 최근 Java를 지원하는 여러 클라우드 컴퓨팅 서비스가 싼 가격에 등장하고 있고 Java뿐만이 아닌 JVM 언어를 이러한 환경에서 구동하는 사례가 늘고 있다. Java 개발 도구를 설치하면 javac라는 컴파일러가 제공된다. 하지만 통합 개발 환경은 제공해 주지 않기 때문에 반드시 별도의 개발용 프로그램을 써야 한다. 대표적으로 이클립스 넷빈즈 IntelliJ IDEA 등이 있다. 만약 이것들을 안 쓰겠다고 한다면 당신에게는 메모장과 javac.exe가 있을 뿐이다. 그리고 Java는 IDE 없이 타이핑만으로 짜기엔 굉장히 불편한 언어라는 것을 명심하자.[6] 실전 Java 개발을 할 때 프로젝트에 필요한 라이브러리 관리나 프로젝트 결과물 배포 등 프로젝트 빌드 관리를 위한 도구로는 아파치 소프트웨어 재단에서 만든 Ant와 Maven 그 중에서도 Maven이 많이 사용되고 있다. 최근에는 이 두 가지의 단점을 보완한 Gradle이 각광을 받고 있으며 안드로이드 프로젝트에서는 기본으로 쓰인다.',
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Open Image Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={imageUrl}
        modalContent={modalContent}
        from={from}
      />
    </div>
  );
}
