// a simple TeX-input example
import mjAPI from 'mathjax-node'
import sharp from 'sharp'
mjAPI.config({
    MathJax: {
        // traditional MathJax configuration
    },
})
mjAPI.start()

var yourMath =
    ' \\dashv  \\dashv  \\dashv  x = a_0 + \\frac{1}{a_1 + \\frac{1}{a_2 + \\frac{1}{a_3 + a_4}}}  x = a_0 + \\frac{1}{a_1 + \\frac{1}{a_2 + \\frac{1}{a_3 + a_4}}}  x = a_0 + \\frac{1}{a_1 + \\frac{1}{a_2 + \\frac{1}{a_3 + a_4}}}  x = a_0 + \\frac{1}{a_1 + \\frac{1}{a_2 + \\frac{1}{a_3 + a_4}}} '

mjAPI.typeset(
    {
        math: yourMath,
        format: 'TeX',
        svg: true,
    },
    function (data) {
        if (!data.errors) {
            console.log(data.svg)
            //@ts-ignore
            sharp(Buffer.from(data.svg)).png().resize(1000).toFile('buf.png')
        }
    },
)
