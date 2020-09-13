import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IprogressBar } from "./componenets/progressBar/progressBarInterfaces";
import ProgressBar from './componenets/progressBar/progressBar'

export class circularProgressIndicator implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * Empty constructor.
	 */
	private notifyOutputChanged: () => void;
	private theContainer: HTMLDivElement;
	private props:IprogressBar={
		circleOneStrock:'#d9edfe',
		circleTwoStrock:'#7ea9e1',
		progress:54,
		percentage:0,
		size:250,
		strockWidth:15,
		textColor:'black',
		maxValue:80,
		progressChanged: this.changeProgress.bind(this),
	}
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this.notifyOutputChanged = notifyOutputChanged;
		if( Number(context.parameters.sampleProperty.raw)<54)
		{
			context.parameters.sampleProperty.raw=55
		}
		this.props.progress = Number(context.parameters.sampleProperty.raw)||54
		this.props.size=isNaN(Number(context.parameters.Size))?100:Number(context.parameters.Size)
		this.props.maxValue=isNaN(Number(context.parameters.MaxValue))?80:Number(context.parameters.MaxValue)
		if((context.parameters.circleOneStrock).raw!=null)
		this.props.circleOneStrock=(context.parameters.circleOneStrock).raw?.toString()!=''?(context.parameters.circleOneStrock).raw?.toString():'#d9edfe'
		if((context.parameters.circleTwoColor).raw!=null)
		this.props.circleTwoStrock=(context.parameters.circleTwoColor).raw?.toString()!=''?(context.parameters.circleTwoColor).raw?.toString():'#7ea9e1'
		if((context.parameters.textColor).raw!=null)
		this.props.textColor=(context.parameters.textColor).raw?.toString()!=''?(context.parameters.textColor).raw?.toString():'black'
		this.props.strockWidth=isNaN(Number(context.parameters.strokeWidth))?15:Number(context.parameters.strokeWidth)
		this.theContainer = container;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		if (context.updatedProperties.includes("sampleProperty")) this.props.progress = Number(context.parameters.sampleProperty.raw) || 3;
		if(this.props.progress!=Number(context.parameters.sampleProperty.raw)||this.props.maxValue!=Number(context.parameters.MaxValue.raw))
		this.changeProgress(Number(context.parameters.sampleProperty.raw),Number(context.parameters.MaxValue.raw))
		ReactDOM.render(
			React.createElement(
				ProgressBar,
				this.props
			),
			this.theContainer
		);
	}

	public changeProgress(newProgress:number,maxValue:number){
		if (this.props.progress !== newProgress||this.props.maxValue !== maxValue) {
			// if(newProgress>=55||newProgress<=100)
			// {
			if(this.props.maxValue !== maxValue)
			this.props.maxValue = maxValue;
			this.props.progress = newProgress;
			this.notifyOutputChanged();
			// }
		}
	}
	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}