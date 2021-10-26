#!/bin/bash
defaultArticles=("https://academy-project-blogs.s3-eu-west-1.amazonaws.com/teaching_code.doc" "https://academy-project-blogs.s3-eu-west-1.amazonaws.com/IDC.md" "https://academy-project-blogs.s3-eu-west-1.amazonaws.com/milestones.txt")

for article in ${defaultArticles[@]}
do 
    text=$(curl $article)
    len=${#text}

    if [[ len -gt 0 ]]
    then
        title=${article:57}
        newTitle=$(echo $title | cut -d '.' -f 1)
        mkdir -p articles
        curl $article > ./articles/${newTitle}.txt
    else 
        echo "this is empty"
    fi
done
