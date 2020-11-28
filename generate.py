#!/usr/bin/env python

from random import shuffle, randint, random

def generate(wordlist, num_paragraphs):
    lipsum = []
    for i in xrange(num_paragraphs):
        lipsum.append(random_paragraph(wordlist))
    return '\n\n'.join(lipsum)


def random_paragraph(wordlist, max_chars=512):
    paragraph = []
    while len(' '.join(paragraph)) < max_chars:
        paragraph.append(random_sentence(wordlist))
    return ' '.join(paragraph)


def random_sentence(wordlist):
    if random() > .3:
        return make_simple_sentence(wordlist)
    else:
        return make_compound_sentence(wordlist)

def random_clause(wordlist, min_length=5, max_length=7):
    shuffle(wordlist)
    return ' '.join(wordlist[0:randint(min_length, max_length)])


def make_simple_sentence(wordlist):
    shuffle(wordlist)
    return '%s.' % random_clause(wordlist).capitalize()


def make_compound_sentence(wordlist):
    shuffle(wordlist)
    return ('%s, %s.' % (random_clause(wordlist, min_length=1),
                         random_clause(wordlist))).capitalize()


with open("wordlist.txt") as wordlist:
    print generate(wordlist.read().splitlines(), 5)
