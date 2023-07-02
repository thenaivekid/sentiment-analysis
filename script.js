document.getElementById('submit_button').addEventListener('click', function(event) {
    event.preventDefault();
    const textElement = document.getElementById('text');
    
    const input_text = textElement.value;
    if (!input_text) {
        alert('Please enter the text');
        return;
    }
    const postData = {
        text: input_text
    };
    
    document.getElementById('result').innerHTML = '';
    
    const keep_text = document.createElement('div');
    keep_text.textContent = textElement.value;
    keep_text.setAttribute('id', 'keep_text');
    document.getElementById('result').appendChild(keep_text);
    textElement.value = '';
    callApi(postData);
});      



async function callApi(postData) {
    try {
        const response = await fetch('http://localhost:8000/process_text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const res = await response.json();
        console.log(res.sentiment);
        const data = res.sentiment;
        const sentiment = data[0].label;
        console.log(sentiment);
        const score = data[0].score;
        console.log(score);
        addToDom(sentiment, score)
    } catch (error) {
        console.error('Error:', error);
    }

}
function addToDom(sentiment, score) {
    const result = document.getElementById('result');
    const sentiment_element = document.createElement('h1');
    sentiment_element.setAttribute('id', 'sentiment');
    sentiment_element.textContent = sentiment;
    result.appendChild(sentiment_element);

    const score_element = document.createElement('p');
    score_element.textContent = `Score: ${score}` ;
    result.appendChild(score_element);

    const body = document.querySelector('body');
    if (sentiment == 'POSITIVE') {
        body.style.backgroundColor = 'green';
    } else if (sentiment == 'NEGATIVE') {
        body.style.backgroundColor = 'red';
    } else {
        body.style.backgroundColor = 'yellow';
    }
}