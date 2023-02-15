import logo from './logo.svg';
import './App.css';
// State 7. 사용할 useSate를 import 시킴
import { useState } from 'react';

function Article(props) {
  // console.log("props", props, props.title, props.body);
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props) {
  // console.log('props', props, props.title);
  return <header>
    {/* Event 4. a태그를 클릭 했을 때 -> 함수(event)가 호출된다 */}
    <h1><a href='/' onClick={(event) => {
      // Event 5. a 태그가 동작하는 기본동작을 프리벤트(방지한다)
      event.preventDefault();   // 리로드 방지(클릭해도 리로드 X)
      // Event 6. onChangeMode의 함수를 실행하려면
      props.onChangeMode();
    }} >{props.title}</a></h1>
  </header>
}
// for문을 이용해서 id에 따라 나오는 태그를 만듬
function Nav(props) {
  // console.log("PROPS : ", props);
  // 3. lis 빈배열로 만들고, 담는다
  const lis = []
  // 1. t에 담는다 : topics를 for을 이용해서 가져와서 -> t 에 담는다
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    // 2. lis에 push(넣다) : topics에서 가져와서 lis에 넣는다
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();   // 리로드 방지(클릭해도 리로드 X)
        props.onChangeMode(Number(event.target.id));  // onChangeMode 호출
        /* State 9-8. 숫자 였던 id -> t.id는 태그를 거치면서 문자로 바뀐다
                      그렇기 때문에 문자 였던 event.target.id -> Number를 추가해주면서 숫자로 바꿔준다 */
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
// Create 4. Create component 생성
// Create 7. 가져온 value를 사용자에게 공급(onCreate=prop)
function Create(props) {
  // Create 4-1. return 값은 Create component도 article 최상위 디렉토리로 하고, 태그로 한다 
  return <article>
    {/* Create 4-2. 제목 설정 */}
    <h2>Create</h2>
    {/* Create 4-3. 어떤 정보를 -> 서버로 전송할 때, 사용하는 HTML태그 : form */}
    {/* Create 6. onCreate를 어떻게 호출? */} {/* onSubmit : submit 버튼을 클릭 했을 때, form태그에서 발생하는 event */}
    <form onSubmit={event => {
      // Create 6-1. 리로드 방지 : form태그는 submit을 했을 때 -> page 리로드(reload)가 된다
      event.preventDefault();
      // Create 6-2. form태그 소속, name=title, name=body인 태그의 -> value값을 가져오기
      // title은 event객체의 target을 통해서 접근할 수 있음
      // event.target -> 태그(form)를 보고 있고, 그 안에 title, body의 value값을 가져오면 된다
      const title = event.target.title.value;
      const body = event.target.body.value;
      // Create 7-1. props를 통해서 onCreate 함수 호출 / 1번 Parameter(title), 2번 Parameter(body)를 준다
      props.onCreate(title, body);
    }}>
      {/* Create 4-4. 입력하는 컨트롤들 추가 */}
      {/* 1줄 텍스트 입력 : input */} {/* text를 입력, 사용자가 입력한 데이터를 -> title 이름 설정, 어떤정보를 입력해야되는지 알려주는 : placeholder */}
      <p><input type="text" name="title" placeholder='제목 입력' /></p>
      {/* 여러줄 텍스트 입력(본문) : textarea */}
      <p><textarea name='body' placeholder='내용 입력' /></p>
      {/* Create 4-5. title, body 값의 입력을 끝내고, 전송할 때 사용하는 컨트롤 : Submit */}
      {/* submit 생성 */}
      <input type="submit" value="Create" />
    </form>
  </article>
}
function Update(props) {
  // 읽기 전용 -> State로 변경
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);  // 읽기 전용이기 때문에 value={props.(title,body)} 이런식으로 불러오지 못함
    }}>
      <p><input type="text" name="title" placeholder='제목 입력' value={title} onChange={event => {
        setTitle(event.target.value);
        // console.log(event.target.value);
      }} /></p>
      <p><textarea name='body' placeholder='내용 입력' value={body} onChange={event => {
        setBody(event.target.value);
      }} /></p>
      <input type="submit" value="Update" />
    </form>
  </article>
}

// 모드의 값을 이벤트가 발생 시 -> 변경
function App() {
  // State 1. mode 지역변수 지정(Application 논리 구성)
  // const mode = 'WELCOME';

  /*
  [ State 8. 지역변수(mode)를 -> 상태로 업그레이드 ]
    const _mode = useState('WELCOME');  // 만들어진 상태(useState) return -> _mode에 넣는다 (노션 참고)
    const mode = _mode[0];              // 읽을 때 : 0번째 원소 값을 변수 mode에 넣는다
    const setMode = _mode[1];           // 바꿀 때 : 1번째 원소 값을 변수 setMode에 넣는다
  */
  // State 8-1 useState 줄인 코드
  const [mode, setMode] = useState('WELCOME');
  // State 9. 어떤 글을 선택 했는지 설정(id)
  const [id, setId] = useState(null);
  // Create 9. id 값 별도 관리(nextId값을 통해서 -> 다음 원소의 id값 결정)
  const [nextId, setNextId] = useState(4); // useState() 초기값 설정 : topics의 마지막 원소(4)
  // Create 8. topics 변수에 새로운 원소를 추가 -> Nav 목록에 추가
  // Create 8-1. topics 상태로 승격 
  const [topics, setTopics] = useState([
    { id: 1, title: 'HTML', body: 'HTML is ???' },
    { id: 2, title: 'CSS', body: 'CSS is ???' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is ???' }
  ]);
  // State 3. 달라지는 조건문의 값을 담는 변수 지정
  let content = null;
  let contextControl = null;
  // State 2. mode의 값에 따라 달라지는 조건문 작성
  if (mode === 'WELCOME') {
    // State 4. 'WELCOME' 일 경우 Article 태그 Welcom page가 된다
    content = <Article title="Welcome ! " body="Hello ~ WEB ?"></Article>
  } else if (mode === 'READ') {
    /* [ title, body 값을 초기화 후 -> topics와 일치하는 id 값을 담는 작업 ] */
    // State 9-5. 변수 선언 : title & body의 초기값을 셋팅
    let title, body = null;
    // State 9-3. for문 : id state 와 일치하는 topics의 원소를 찾기
    for (let i = 0; i < topics.length; i++) {
      // console.log(topics[i].id, id);  // // State 9-(7). 확인 : 1 '3'  2 '3'  3 '3' 문자로 나오는 것으로 확인 -> 9-8에서 확인
      // State 9-4. if문 : 만약에(if) topics[i]의 id와 id state가 일치 할 경우
      if (topics[i].id === id) {
        // State 9-6. 변수(title & body)에 값을 셋팅
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    // State 5. 'READ' 일 경우 Article 태그 Read page가 된다
    // State 9-7. title & body를 값{title, body}로 셋팅
    content = <Article title={title} body={body}></Article>
    contextControl = <>
      <li><a href={'/update/' + id} onClick={event => {
        event.preventDefault();
        setMode('Update');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={() => {
        const newTopics = []
        for (let i = 0; i < topics.length; i++) {
          if (topics[i].id !== id) {
            newTopics.push(topics[i]);
          }
        }
        // 삭제가 된 값을 -> setTopics에 넣어준다
        setTopics(newTopics);
        // 삭제 후 -> Main 페이지로 이동
        setMode('WELCOME');
      }} /></li>
    </>
  } else if (mode === "CREATE") {   // Create 3. if문 추가 : mode가 "CREATE"라면? -> 어떻게 컨텐트 변수가 바뀌게 되는지?
    // Create 5. onCreate : 버튼(Create)을 눌렀을 때 -> 다음 실행으로 어떤 작업을 하는지? (후속 작업을 할 수 있는 인터페이스 제공)
    // onCreate prop에 함수를 전달하면, 사용자가 버튼(Create)을 눌렀을 때, 이 함수가 실행되고, title & body값을 받을 수 있어야 한다
    content = <Create onCreate={(_title, _body) => {  // Create 7-2. onCreate 함수 실행, title & body값을 통해서 -> 사용자가 입력한 title & body 값을 Create component의 사용자에게 공급할 수 있다
      // Create 8-2. 변수 생성(newTopic) : topics에 들어갈 새로운 원소(객체 : newTopic)
      // Create 9-1. id 값 사용
      const newTopic = { id: nextId, title: _title, body: _body }  // title(객체의 이름): _title(parameter의 이름)
      // Create 9-2. 원본 복제 -> 복제본 생성 후 추가
      const newTopics = [...topics];  // 복제본 생성
      newTopics.push(newTopic);       // 새로운 원소 -> 복제본에 넣고
      setTopics(newTopics);           // setTopics 호출하면 -> newTopics 출력
      // Create 10. Create 전송 후 상세페이지로 이동
      setMode("READ");        // 상세페이지 이동
      setId(nextId);          // id -> nextId로 지정
      setNextId(nextId + 1);  // 다름 글 추가 대비
    }}></Create>
  } else if (mode === "Update") {
    /* 'READ' for문 복붙 : title, body 값을 알아내는 부분 -> 붙여넣기 */
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      // console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      // console.log(title, body); // title, body 값 새로 출력되는 것 확인
      // 원본(topics) 복제(배열) 만들기
      const newTopics = [...topics]
      // 수정 할 topic 만들기
      const updatedTopic = { id: id, title: title, body: body }
      // 기존의 topics에서 id가 일치하는 것을 찾기
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          // newTopics -> updatedTopics로 교체
          newTopics[i] = updatedTopic;
          break;
        }
      }
      // 새로운 topics를 -> setTopics로 저장
      setTopics(newTopics);
      // 상세보기 페이지로 이동
      setMode('READ');

    }} ></Update>
  }
  return (
    <div>
      {/*  
        Event 1. event 기능 추가
          Component 사용자가 Header를 클릭 했을 때 -> 정의 할 수 있도록 처리해 줌  
        Event 2. onchangeMode라고 하는 prop의 값으로 -> 함수를 전달
        Event 3. Header Component 안에서 링크를 클릭하면 component가 이 함수를 호출해서 Header를 클릭 했을 때, 해야되는 작업들이 실행되게 하고 싶을 때
      */}
      <Header title="REACT" onChangeMode={() => {
        // alert('Header');
        // State 1-1. mode의 값을 event가 발생했을 때 변경
        // mode = 'WELCOME';
        // State 8-2. 바꿀 값이기 때문에 mode -> setMode로 변경
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        // alert(id);
        // State 1-2. mode의 값을 event가 발생했을 때 변경
        // mode = 'READ';
        // State 8-3. 바꿀 값이기 때문에 mode -> setMode로 변경
        setMode('READ');
        // State 9-1. setId 값이 바뀌는 지점&위치(Nav 클릭)
        setId(_id); // State 9-2 클릭이 되면 component가 새로 실행되면서 -> 새로운 id값이 지정된다
      }}></Nav>
      {/* State 3. 변수(content)에 넣어두고 */}
      {/* <Article title="Welcome ! " body="Hello ~ WEB ?"></Article> */}
      {/* State 6. 변수를 실행 */}
      {content}
      {/* Create 1. Create 생성 */}
      {/* Create 2. Create 클릭 -> mode(create) 변경되고, create 해당되는 ui 출력
                    실행 : 클릭(onClick)했을 때 -> 함수(event) 실행 */}
      <ul>
        <li><a href="/create" onClick={event => {
          // Create 2-1. 리로드 X : "/create" 로 바뀌지 않음
          event.preventDefault();
          // Create 2-2. mode 값 변경 : setMode 값을 CREATE로 변경
          setMode("CREATE");
        }}>Create</a></li>
        {/* Update = contextControl */}
        {contextControl}
      </ul>
    </div >
  );
}

export default App;
