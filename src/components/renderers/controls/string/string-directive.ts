import {RendererTester,RendererService,NOT_FITTING} from '../../renderer-service';
import {IPathResolver} from '../../../services/pathresolver/jsonforms-pathresolver';
import {AbstractControl, ControlRendererTester} from '../abstract-control';
class StringDirective implements ng.IDirective {
    restrict = "E";
    //replace= true;
    template = `
    <jsonforms-control>
       <input type="text" id="{{vm.id}}" class="form-control jsf-control-string" ng-model="vm.modelValue[vm.fragment]" ng-change='vm.modelChanged()'/>
    </jsonforms-control>`;
    controller = StringController;
    controllerAs = 'vm';
}
class StringAreaDirective implements ng.IDirective {
    restrict = "E";
    //replace= true;
    template = `
    <jsonforms-control>
       <textarea id="{{vm.id}}" class="form-control jsf-control-string" ng-model="vm.modelValue[vm.fragment]" ng-change='vm.modelChanged()'/>
    </jsonforms-control>`;
    controller = StringController;
    controllerAs = 'vm';
}
interface StringControllerScope extends ng.IScope {
}
class StringController extends AbstractControl {
    static $inject = ['$scope','PathResolver'];
    constructor(scope: StringControllerScope,refResolver: IPathResolver) {
        super(scope,refResolver);
    }
}
let StringControlRendererTester: RendererTester = ControlRendererTester('string',1);
let StringAreaControlRendererTester: RendererTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any,pathResolver:IPathResolver ){
    let specificity=ControlRendererTester('string',1)(element,dataSchema,dataObject,pathResolver);
    if(specificity==NOT_FITTING)
        return NOT_FITTING;
    if (element['options'] != null && element['options']['multi'])
        return 2;
    return NOT_FITTING;
}

export default angular
    .module('jsonforms.renderers.controls.string')
    .directive('stringControl', () => new StringDirective())
    .directive('stringAreaControl', () => new StringAreaDirective())
    .run(['RendererService', RendererService =>
        {
            RendererService.register("string-control",StringControlRendererTester);
            RendererService.register("string-area-control",StringAreaControlRendererTester);
        }
    ])
    .name;
