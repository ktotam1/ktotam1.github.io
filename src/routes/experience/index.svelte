
<div class="wrapper">
    <div class="subwrapper">
        <h1>EPFL</h1>
        <dl>
            <dt>Object Oriented Programming</dt>
                <dd>Hello</dd>
            <dt>Functional Programming</dt>
                <dd>Class 2</dd>
            <dt>Intro to Machine Learning</dt>
                <dd>Hello</dd>
            <dt>Numerical Methods for Visual Computing and Machine Learning</dt>
                <dd>Hello</dd>
            <dt>Computer Architecture</dt>
                <dd>Hello</dd>
            <dt>Computer Networks</dt>
                <dd>Hello</dd>
            <dt>Computer Algorithms</dt>
                <dd>Hello</dd>
            <dt>Advanced Information, Computation, and Calculation I, II</dt>
                <dd>Hello</dd>
            <dt>Analysis I, II, III</dt>
                <dd>Hello</dd>
            <dt>Physics: Mechanics, Electromagnetism</dt>
                <dd>Hello</dd>

        </dl>
    </div>
    <div class="subwrapper">
        <h1>Rocket Team</h1>
        <dl>
            <dt>Ticket To Ride</dt>
            <dd>Hello</dd>
            <dt>Ticket To Ride</dt>
            <dd>Hello</dd>
            <dt>Ticket To Ride</dt>
            <dd>Hello</dd>
            <dt>Ticket To Ride</dt>
            <dd>Hello</dd>

        </dl>
    </div>
    <div class="subwrapper">
        <h1>Wolf</h1>
        <dl>
            <dt>EPFL</dt>
            <dd>Hello</dd>
        </dl>
    </div>
    <div class="subwrapper">
        <h1>TA</h1>
        <dl>
            <dt>EPFL</dt>
            <dd>Hello</dd>
        </dl>
    </div>
</div>

<style>
    .wrapper {
        justify-content: center;
        display: grid ;
        grid-template-columns: 30ch 30ch;
        gap: 10px;
    }
    dl{
        align-self: center;
        justify-self: center;
    }
    .subwrapper {
        overflow: hidden;
        overflow-y: scroll;
        justify-items: center;
        max-height: 50;
    }
    
</style>