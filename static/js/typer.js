const typer_content = document.getElementById("typer-content");
const typer_list = document.querySelectorAll("#typer-list li");

const letter_typing_time = 0.1;
const letter_untyping_time = 0.03;
const phrase_retain_time = 1;

function Type_Word(word, word_index){
	if(word_index < word.length){
		typer_content.innerHTML = typer_content.innerHTML.replace("|", "");
		typer_content.innerHTML += word[word_index]+"|";
		word_index++;
		setTimeout(() => Type_Word(word, word_index), letter_typing_time*1000);
	}
}

function Un_Type_Word(word, word_index){
	if(word_index > 0){
		typer_content.innerHTML = typer_content.innerHTML.substring(0, typer_content.innerHTML.indexOf('|')-1) + '|';
		word_index--;
		setTimeout(() => Un_Type_Word(word, word_index), letter_untyping_time*1000);
	}else{
		typer_content.innerHTML = '';
	}
}

var current_phrase_index=0;

function Type_Words(){
	if(current_phrase_index >= typer_list.length)
		current_phrase_index = 0;

	var phrase = typer_list[current_phrase_index].innerHTML;
	var phrase_type_time = letter_typing_time*phrase.length;
	var phrase_untype_time = letter_untyping_time*phrase.length;

	Type_Word(phrase, 0);
	setTimeout(function(){
		Un_Type_Word(phrase, phrase.length);
	}, (phrase_type_time + phrase_retain_time) *1000 );

	current_phrase_index++;

	setTimeout(Type_Words,
		(phrase_type_time + phrase_retain_time + phrase_untype_time + phrase_retain_time/2) *1000 );
}

Type_Words();