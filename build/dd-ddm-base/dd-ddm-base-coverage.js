if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/dd-ddm-base/dd-ddm-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/dd-ddm-base/dd-ddm-base.js",
    code: []
};
_yuitest_coverage["build/dd-ddm-base/dd-ddm-base.js"].code=["YUI.add('dd-ddm-base', function (Y, NAME) {","","","    /**","     * Provides the base Drag Drop Manger required for making a Node draggable.","     * @module dd","     * @submodule dd-ddm-base","     */     ","     /**","     * Provides the base Drag Drop Manger required for making a Node draggable.","     * @class DDM","     * @extends Base","     * @constructor","     * @namespace DD","     */","    ","    var DDMBase = function() {","        DDMBase.superclass.constructor.apply(this, arguments);","    };","","    DDMBase.NAME = 'ddm';","","    DDMBase.ATTRS = {","        /**","        * @attribute dragCursor","        * @description The cursor to apply when dragging, if shimmed the shim will get the cursor.","        * @type String","        */","        dragCursor: {","            value: 'move'","        },","        /**","        * @attribute clickPixelThresh","        * @description The number of pixels to move to start a drag operation, default is 3.","        * @type Number","        */","        clickPixelThresh: {","            value: 3","        },","        /**","        * @attribute clickTimeThresh","        * @description The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.","        * @type Number","        */        ","        clickTimeThresh: {","            value: 1000","        },","        /**","        * @attribute throttleTime","        * @description The number of milliseconds to throttle the mousemove event. Default: 150","        * @type Number","        */        ","        throttleTime: {","            //value: 150","            value: -1","        },","        /**","        * @attribute dragMode","        * @description This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of all future Drag instances. ","        * @type String","        */        ","        dragMode: {","            value: 'point',","            setter: function(mode) {","                this._setDragMode(mode);","                return mode;","            }           ","        }","","    };","","    Y.extend(DDMBase, Y.Base, {","        _createPG: function() {},","        /**","        * @property _active","        * @description flag set when we activate our first drag, so DDM can start listening for events.","        * @type {Boolean}","        */","        _active: null,","        /**","        * @private","        * @method _setDragMode","        * @description Handler for dragMode attribute setter.","        * @param String/Number The Number value or the String for the DragMode to default all future drag instances to.","        * @return Number The Mode to be set","        */","        _setDragMode: function(mode) {","            if (mode === null) {","                mode = Y.DD.DDM.get('dragMode');","            }","            switch (mode) {","                case 1:","                case 'intersect':","                    return 1;","                case 2:","                case 'strict':","                    return 2;","                case 0:","                case 'point':","                    return 0;","            }","            return 0;       ","        },","        /**","        * @property CSS_PREFIX","        * @description The PREFIX to attach to all DD CSS class names","        * @type {String}","        */","        CSS_PREFIX: Y.ClassNameManager.getClassName('dd'),","        _activateTargets: function() {},        ","        /**","        * @private","        * @property _drags","        * @description Holder for all registered drag elements.","        * @type {Array}","        */","        _drags: [],","        /**","        * @property activeDrag","        * @description A reference to the currently active draggable object.","        * @type {Drag}","        */","        activeDrag: false,","        /**","        * @private","        * @method _regDrag","        * @description Adds a reference to the drag object to the DDM._drags array, called in the constructor of Drag.","        * @param {Drag} d The Drag object","        */","        _regDrag: function(d) {","            if (this.getDrag(d.get('node'))) {","                return false;","            }","            ","            if (!this._active) {","                this._setupListeners();","            }","            this._drags.push(d);","            return true;","        },","        /**","        * @private","        * @method _unregDrag","        * @description Remove this drag object from the DDM._drags array.","        * @param {Drag} d The drag object.","        */","        _unregDrag: function(d) {","            var tmp = [];","            Y.each(this._drags, function(n, i) {","                if (n !== d) {","                    tmp[tmp.length] = n;","                }","            });","            this._drags = tmp;","        },","        /**","        * @private","        * @method _setupListeners","        * @description Add the document listeners.","        */","        _setupListeners: function() {","            this._createPG();","            this._active = true;","","            var doc = Y.one(Y.config.doc);","            doc.on('mousemove', Y.throttle(Y.bind(this._move, this), this.get('throttleTime')));","            doc.on('mouseup', Y.bind(this._end, this));","        },","        /**","        * @private","        * @method _start","        * @description Internal method used by Drag to signal the start of a drag operation","        */","        _start: function() {","            this.fire('ddm:start');","            this._startDrag();","        },","        /**","        * @private","        * @method _startDrag","        * @description Factory method to be overwritten by other DDM's","        * @param {Number} x The x position of the drag element","        * @param {Number} y The y position of the drag element","        * @param {Number} w The width of the drag element","        * @param {Number} h The height of the drag element","        */","        _startDrag: function() {},","        /**","        * @private","        * @method _endDrag","        * @description Factory method to be overwritten by other DDM's","        */","        _endDrag: function() {},","        _dropMove: function() {},","        /**","        * @private","        * @method _end","        * @description Internal method used by Drag to signal the end of a drag operation","        */","        _end: function() {","            if (this.activeDrag) {","                this._endDrag();","                this.fire('ddm:end');","                this.activeDrag.end.call(this.activeDrag);","                this.activeDrag = null;","            }","        },","        /**","        * @method stopDrag","        * @description Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.","        * @return {Self}","        * @chainable","        */       ","        stopDrag: function() {","            if (this.activeDrag) {","                this._end();","            }","            return this;","        },","        /**","        * @private","        * @method _move","        * @description Internal listener for the mousemove DOM event to pass to the Drag's move method.","        * @param {Event.Facade} ev The Dom mousemove Event","        */","        _move: function(ev) {","            if (this.activeDrag) {","                this.activeDrag._move.call(this.activeDrag, ev);","                this._dropMove();","            }","        },","        /**","        * //TODO Private, rename??...","        * @private","        * @method cssSizestoObject","        * @description Helper method to use to set the gutter from the attribute setter.","        * @param {String} gutter CSS style string for gutter: '5 0' (sets top and bottom to 5px, left and right to 0px), '1 2 3 4' (top 1px, right 2px, bottom 3px, left 4px)","        * @return {Object} The gutter Object Literal.","        */","        cssSizestoObject: function(gutter) {","            var x = gutter.split(' ');","                ","            switch (x.length) {","                case 1: x[1] = x[2] = x[3] = x[0]; break;","                case 2: x[2] = x[0]; x[3] = x[1]; break;","                case 3: x[3] = x[1]; break;","            }","","            return {","                top   : parseInt(x[0],10),","                right : parseInt(x[1],10),","                bottom: parseInt(x[2],10),","                left  : parseInt(x[3],10)","            };","        },","        /**","        * @method getDrag","        * @description Get a valid Drag instance back from a Node or a selector string, false otherwise","        * @param {String/Object} node The Node instance or Selector string to check for a valid Drag Object","        * @return {Object}","        */","        getDrag: function(node) {","            var drag = false,","                n = Y.one(node);","            if (n instanceof Y.Node) {","                Y.each(this._drags, function(v, k) {","                    if (n.compareTo(v.get('node'))) {","                        drag = v;","                    }","                });","            }","            return drag;","        },","        /**","        * @method swapPosition","        * @description Swap the position of 2 nodes based on their CSS positioning.","        * @param {Node} n1 The first node to swap","        * @param {Node} n2 The first node to swap","        * @return {Node}","        */","        swapPosition: function(n1, n2) {","            n1 = Y.DD.DDM.getNode(n1);","            n2 = Y.DD.DDM.getNode(n2);","            var xy1 = n1.getXY(),","                xy2 = n2.getXY();","","            n1.setXY(xy2);","            n2.setXY(xy1);","            return n1;","        },","        /**","        * @method getNode","        * @description Return a node instance from the given node, selector string or Y.Base extended object.","        * @param {Node/Object/String} n The node to resolve.","        * @return {Node}","        */","        getNode: function(n) {","            if (n instanceof Y.Node) {","                return n;","            }","            if (n && n.get) {","                if (Y.Widget && (n instanceof Y.Widget)) {","                    n = n.get('boundingBox');","                } else {","                    n = n.get('node');","                }","            } else {","                n = Y.one(n);","            }","            return n;","        },","        /**","        * @method swapNode","        * @description Swap the position of 2 nodes based on their DOM location.","        * @param {Node} n1 The first node to swap","        * @param {Node} n2 The first node to swap","        * @return {Node}","        */","        swapNode: function(n1, n2) {","            n1 = Y.DD.DDM.getNode(n1);","            n2 = Y.DD.DDM.getNode(n2);","            var p = n2.get('parentNode'),","                s = n2.get('nextSibling');","","            if (s == n1) {","                p.insertBefore(n1, n2);","            } else if (n2 == n1.get('nextSibling')) {","                p.insertBefore(n2, n1);","            } else {","                n1.get('parentNode').replaceChild(n2, n1);","                p.insertBefore(n1, s);","            }","            return n1;","        }","    });","","    Y.namespace('DD');","    Y.DD.DDM = new DDMBase();","","    /**","    * @event ddm:start","    * @description Fires from the DDM before all drag events fire.","    * @type {CustomEvent}","    */","    /**","    * @event ddm:end","    * @description Fires from the DDM after the DDM finishes, before the drag end events.","    * @type {CustomEvent}","    */","","","","","}, '@VERSION@', {\"requires\": [\"node\", \"base\", \"yui-throttle\", \"classnamemanager\"]});"];
_yuitest_coverage["build/dd-ddm-base/dd-ddm-base.js"].lines = {"1":0,"17":0,"18":0,"21":0,"23":0,"65":0,"66":0,"72":0,"88":0,"89":0,"91":0,"94":0,"97":0,"100":0,"102":0,"131":0,"132":0,"135":0,"136":0,"138":0,"139":0,"148":0,"149":0,"150":0,"151":0,"154":0,"162":0,"163":0,"165":0,"166":0,"167":0,"175":0,"176":0,"201":0,"202":0,"203":0,"204":0,"205":0,"215":0,"216":0,"218":0,"227":0,"228":0,"229":0,"241":0,"243":0,"244":0,"245":0,"246":0,"249":0,"263":0,"265":0,"266":0,"267":0,"268":0,"272":0,"282":0,"283":0,"284":0,"287":0,"288":0,"289":0,"298":0,"299":0,"301":0,"302":0,"303":0,"305":0,"308":0,"310":0,"320":0,"321":0,"322":0,"325":0,"326":0,"327":0,"328":0,"330":0,"331":0,"333":0,"337":0,"338":0};
_yuitest_coverage["build/dd-ddm-base/dd-ddm-base.js"].functions = {"DDMBase:17":0,"setter:64":0,"_setDragMode:87":0,"_regDrag:130":0,"(anonymous 2):149":0,"_unregDrag:147":0,"_setupListeners:161":0,"_start:174":0,"_end:200":0,"stopDrag:214":0,"_move:226":0,"cssSizestoObject:240":0,"(anonymous 3):266":0,"getDrag:262":0,"swapPosition:281":0,"getNode:297":0,"swapNode:319":0,"(anonymous 1):1":0};
_yuitest_coverage["build/dd-ddm-base/dd-ddm-base.js"].coveredLines = 82;
_yuitest_coverage["build/dd-ddm-base/dd-ddm-base.js"].coveredFunctions = 18;
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 1);
YUI.add('dd-ddm-base', function (Y, NAME) {


    /**
     * Provides the base Drag Drop Manger required for making a Node draggable.
     * @module dd
     * @submodule dd-ddm-base
     */     
     /**
     * Provides the base Drag Drop Manger required for making a Node draggable.
     * @class DDM
     * @extends Base
     * @constructor
     * @namespace DD
     */
    
    _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 17);
var DDMBase = function() {
        _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "DDMBase", 17);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 18);
DDMBase.superclass.constructor.apply(this, arguments);
    };

    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 21);
DDMBase.NAME = 'ddm';

    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 23);
DDMBase.ATTRS = {
        /**
        * @attribute dragCursor
        * @description The cursor to apply when dragging, if shimmed the shim will get the cursor.
        * @type String
        */
        dragCursor: {
            value: 'move'
        },
        /**
        * @attribute clickPixelThresh
        * @description The number of pixels to move to start a drag operation, default is 3.
        * @type Number
        */
        clickPixelThresh: {
            value: 3
        },
        /**
        * @attribute clickTimeThresh
        * @description The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.
        * @type Number
        */        
        clickTimeThresh: {
            value: 1000
        },
        /**
        * @attribute throttleTime
        * @description The number of milliseconds to throttle the mousemove event. Default: 150
        * @type Number
        */        
        throttleTime: {
            //value: 150
            value: -1
        },
        /**
        * @attribute dragMode
        * @description This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of all future Drag instances. 
        * @type String
        */        
        dragMode: {
            value: 'point',
            setter: function(mode) {
                _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "setter", 64);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 65);
this._setDragMode(mode);
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 66);
return mode;
            }           
        }

    };

    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 72);
Y.extend(DDMBase, Y.Base, {
        _createPG: function() {},
        /**
        * @property _active
        * @description flag set when we activate our first drag, so DDM can start listening for events.
        * @type {Boolean}
        */
        _active: null,
        /**
        * @private
        * @method _setDragMode
        * @description Handler for dragMode attribute setter.
        * @param String/Number The Number value or the String for the DragMode to default all future drag instances to.
        * @return Number The Mode to be set
        */
        _setDragMode: function(mode) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "_setDragMode", 87);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 88);
if (mode === null) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 89);
mode = Y.DD.DDM.get('dragMode');
            }
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 91);
switch (mode) {
                case 1:
                case 'intersect':
                    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 94);
return 1;
                case 2:
                case 'strict':
                    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 97);
return 2;
                case 0:
                case 'point':
                    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 100);
return 0;
            }
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 102);
return 0;       
        },
        /**
        * @property CSS_PREFIX
        * @description The PREFIX to attach to all DD CSS class names
        * @type {String}
        */
        CSS_PREFIX: Y.ClassNameManager.getClassName('dd'),
        _activateTargets: function() {},        
        /**
        * @private
        * @property _drags
        * @description Holder for all registered drag elements.
        * @type {Array}
        */
        _drags: [],
        /**
        * @property activeDrag
        * @description A reference to the currently active draggable object.
        * @type {Drag}
        */
        activeDrag: false,
        /**
        * @private
        * @method _regDrag
        * @description Adds a reference to the drag object to the DDM._drags array, called in the constructor of Drag.
        * @param {Drag} d The Drag object
        */
        _regDrag: function(d) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "_regDrag", 130);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 131);
if (this.getDrag(d.get('node'))) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 132);
return false;
            }
            
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 135);
if (!this._active) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 136);
this._setupListeners();
            }
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 138);
this._drags.push(d);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 139);
return true;
        },
        /**
        * @private
        * @method _unregDrag
        * @description Remove this drag object from the DDM._drags array.
        * @param {Drag} d The drag object.
        */
        _unregDrag: function(d) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "_unregDrag", 147);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 148);
var tmp = [];
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 149);
Y.each(this._drags, function(n, i) {
                _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "(anonymous 2)", 149);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 150);
if (n !== d) {
                    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 151);
tmp[tmp.length] = n;
                }
            });
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 154);
this._drags = tmp;
        },
        /**
        * @private
        * @method _setupListeners
        * @description Add the document listeners.
        */
        _setupListeners: function() {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "_setupListeners", 161);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 162);
this._createPG();
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 163);
this._active = true;

            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 165);
var doc = Y.one(Y.config.doc);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 166);
doc.on('mousemove', Y.throttle(Y.bind(this._move, this), this.get('throttleTime')));
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 167);
doc.on('mouseup', Y.bind(this._end, this));
        },
        /**
        * @private
        * @method _start
        * @description Internal method used by Drag to signal the start of a drag operation
        */
        _start: function() {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "_start", 174);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 175);
this.fire('ddm:start');
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 176);
this._startDrag();
        },
        /**
        * @private
        * @method _startDrag
        * @description Factory method to be overwritten by other DDM's
        * @param {Number} x The x position of the drag element
        * @param {Number} y The y position of the drag element
        * @param {Number} w The width of the drag element
        * @param {Number} h The height of the drag element
        */
        _startDrag: function() {},
        /**
        * @private
        * @method _endDrag
        * @description Factory method to be overwritten by other DDM's
        */
        _endDrag: function() {},
        _dropMove: function() {},
        /**
        * @private
        * @method _end
        * @description Internal method used by Drag to signal the end of a drag operation
        */
        _end: function() {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "_end", 200);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 201);
if (this.activeDrag) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 202);
this._endDrag();
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 203);
this.fire('ddm:end');
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 204);
this.activeDrag.end.call(this.activeDrag);
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 205);
this.activeDrag = null;
            }
        },
        /**
        * @method stopDrag
        * @description Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.
        * @return {Self}
        * @chainable
        */       
        stopDrag: function() {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "stopDrag", 214);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 215);
if (this.activeDrag) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 216);
this._end();
            }
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 218);
return this;
        },
        /**
        * @private
        * @method _move
        * @description Internal listener for the mousemove DOM event to pass to the Drag's move method.
        * @param {Event.Facade} ev The Dom mousemove Event
        */
        _move: function(ev) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "_move", 226);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 227);
if (this.activeDrag) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 228);
this.activeDrag._move.call(this.activeDrag, ev);
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 229);
this._dropMove();
            }
        },
        /**
        * //TODO Private, rename??...
        * @private
        * @method cssSizestoObject
        * @description Helper method to use to set the gutter from the attribute setter.
        * @param {String} gutter CSS style string for gutter: '5 0' (sets top and bottom to 5px, left and right to 0px), '1 2 3 4' (top 1px, right 2px, bottom 3px, left 4px)
        * @return {Object} The gutter Object Literal.
        */
        cssSizestoObject: function(gutter) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "cssSizestoObject", 240);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 241);
var x = gutter.split(' ');
                
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 243);
switch (x.length) {
                case 1: _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 244);
x[1] = x[2] = x[3] = x[0]; break;
                case 2: _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 245);
x[2] = x[0]; x[3] = x[1]; break;
                case 3: _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 246);
x[3] = x[1]; break;
            }

            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 249);
return {
                top   : parseInt(x[0],10),
                right : parseInt(x[1],10),
                bottom: parseInt(x[2],10),
                left  : parseInt(x[3],10)
            };
        },
        /**
        * @method getDrag
        * @description Get a valid Drag instance back from a Node or a selector string, false otherwise
        * @param {String/Object} node The Node instance or Selector string to check for a valid Drag Object
        * @return {Object}
        */
        getDrag: function(node) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "getDrag", 262);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 263);
var drag = false,
                n = Y.one(node);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 265);
if (n instanceof Y.Node) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 266);
Y.each(this._drags, function(v, k) {
                    _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "(anonymous 3)", 266);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 267);
if (n.compareTo(v.get('node'))) {
                        _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 268);
drag = v;
                    }
                });
            }
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 272);
return drag;
        },
        /**
        * @method swapPosition
        * @description Swap the position of 2 nodes based on their CSS positioning.
        * @param {Node} n1 The first node to swap
        * @param {Node} n2 The first node to swap
        * @return {Node}
        */
        swapPosition: function(n1, n2) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "swapPosition", 281);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 282);
n1 = Y.DD.DDM.getNode(n1);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 283);
n2 = Y.DD.DDM.getNode(n2);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 284);
var xy1 = n1.getXY(),
                xy2 = n2.getXY();

            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 287);
n1.setXY(xy2);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 288);
n2.setXY(xy1);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 289);
return n1;
        },
        /**
        * @method getNode
        * @description Return a node instance from the given node, selector string or Y.Base extended object.
        * @param {Node/Object/String} n The node to resolve.
        * @return {Node}
        */
        getNode: function(n) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "getNode", 297);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 298);
if (n instanceof Y.Node) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 299);
return n;
            }
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 301);
if (n && n.get) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 302);
if (Y.Widget && (n instanceof Y.Widget)) {
                    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 303);
n = n.get('boundingBox');
                } else {
                    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 305);
n = n.get('node');
                }
            } else {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 308);
n = Y.one(n);
            }
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 310);
return n;
        },
        /**
        * @method swapNode
        * @description Swap the position of 2 nodes based on their DOM location.
        * @param {Node} n1 The first node to swap
        * @param {Node} n2 The first node to swap
        * @return {Node}
        */
        swapNode: function(n1, n2) {
            _yuitest_coverfunc("build/dd-ddm-base/dd-ddm-base.js", "swapNode", 319);
_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 320);
n1 = Y.DD.DDM.getNode(n1);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 321);
n2 = Y.DD.DDM.getNode(n2);
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 322);
var p = n2.get('parentNode'),
                s = n2.get('nextSibling');

            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 325);
if (s == n1) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 326);
p.insertBefore(n1, n2);
            } else {_yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 327);
if (n2 == n1.get('nextSibling')) {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 328);
p.insertBefore(n2, n1);
            } else {
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 330);
n1.get('parentNode').replaceChild(n2, n1);
                _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 331);
p.insertBefore(n1, s);
            }}
            _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 333);
return n1;
        }
    });

    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 337);
Y.namespace('DD');
    _yuitest_coverline("build/dd-ddm-base/dd-ddm-base.js", 338);
Y.DD.DDM = new DDMBase();

    /**
    * @event ddm:start
    * @description Fires from the DDM before all drag events fire.
    * @type {CustomEvent}
    */
    /**
    * @event ddm:end
    * @description Fires from the DDM after the DDM finishes, before the drag end events.
    * @type {CustomEvent}
    */




}, '@VERSION@', {"requires": ["node", "base", "yui-throttle", "classnamemanager"]});
